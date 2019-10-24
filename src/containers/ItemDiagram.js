import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { backToMain, toScreenTwo } from '../actions'
// import data from '../../data'
import data from 'config'

const styleButton = {
    display: 'block',
    margin: '0 auto',
    marginBottom: '30px',
    height: '40px',
    width: '200px',
    backgroundColor: 'orange'
}

export const colors = [
    '#808000',
    '#5F9EA0',
    '#A9A9A9',
    '#9932CC',
    '#FF1493',
    '#1E90FF',
    '#ADFF2F',
    '#FFE4C4',
    '#5F9EA0',
    '#A9A9A9',
    '#9932CC',
    '#FF1493',
    '#1E90FF',
    '#ADFF2F'
];

const STEP_HEIGHT = 80;
const STEP_Y = 80;
const START_Y = 110;
const SMALL_CIRCLE = 15;
const BIG_CIRCLE = 25

class ItemDiagram extends React.Component {
    constructor(props) {
        super(props);
        this.canvasWidth = document.body.offsetWidth * 4 / 5;
        this.columnNumber = data.columns.length;
        this.stepsNumber = data.steps.length;
        this.canvasHeight = this.stepsNumber * STEP_HEIGHT + STEP_HEIGHT;
        this.columnWidth = Number((this.canvasWidth / this.columnNumber).toFixed());
        this.titleFont = `${25 * 4 / this.columnNumber + 5}px Arial`;

    }

    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d");
        this.drawColumnsGreed(ctx);
        this.drawSteps(ctx, canvas);
        this.drawHeaderLine(ctx);
    }

    drawColumnsGreed(ctx) {
        let columnX = 0;
        for (let i = 0; i < this.columnNumber; i++) {
            ctx.fillStyle = colors[i];
            ctx.fillRect(columnX, 0, this.columnWidth, this.canvasHeight)
            //dashed lines
            ctx.beginPath();
            ctx.setLineDash([15, 15]);
            ctx.moveTo(columnX + this.columnWidth / 2, 87);
            ctx.lineTo(columnX + this.columnWidth / 2, this.canvasHeight);
            ctx.lineWidth = 1;
            ctx.stroke();
            //Column Title
            ctx.fillStyle = "black";
            ctx.font = this.titleFont;
            ctx.fillText(data.columns[i].name, columnX + 100 / this.columnNumber, 50);
            columnX = columnX + this.columnWidth;
        }
    }

    drawHeaderLine(ctx) {
        ctx.beginPath();
        ctx.moveTo(0, 80);
        ctx.lineTo(this.canvasWidth, 80);
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    drawSteps(ctx, canvas) {
        const arr = new Array(this.columnNumber).fill(1);
        const arrCenterX = arr.map((val, index) => Number((this.columnWidth / 2).toFixed()) + index * this.columnWidth)
        const circleRadius = this.columnNumber > 5 ? SMALL_CIRCLE : BIG_CIRCLE;
        let stepY = START_Y;
        for (let i = 0; i < this.stepsNumber; i++) {
            ctx.setLineDash([]);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(arrCenterX[data.steps[i][0] - 1], stepY, circleRadius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.font = this.titleFont;
            ctx.fillText(`${i + 1}`, arrCenterX[data.steps[i][0] - 1] - 5, stepY + 5);
            let lineStart = data.steps[i][1] > data.steps[i][0] ? circleRadius : -circleRadius;
            if (data.steps[i][0] !== data.steps[i][1]) {
                ctx.beginPath();       // Start a new path
                ctx.moveTo(arrCenterX[data.steps[i][0] - 1] + lineStart, stepY);
                ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY);
                ctx.lineWidth = 2;
                ctx.stroke();
                this.drawArrows(ctx, arrCenterX, stepY, i);
                this.drawRectangularWithListeners(ctx, canvas, arrCenterX, stepY, i);
            } else {
                this.drawSelfPointingArrow(ctx, circleRadius, stepY, arrCenterX, i);
            }
            stepY = stepY + STEP_Y;
        }
    }

    drawArrows(ctx, arrCenterX, stepY, i) {
        if (data.steps[i][1] > data.steps[i][0]) {
            ctx.beginPath();       // Start a new path
            ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY);
            ctx.lineTo(arrCenterX[data.steps[i][1] - 1] - 10, stepY - 5);
            ctx.stroke();
            ctx.beginPath();       // Start a new path
            ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY);
            ctx.lineTo(arrCenterX[data.steps[i][1] - 1] - 10, stepY + 5);
            ctx.stroke();
        } else {
            ctx.beginPath();       // Start a new path
            ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY);
            ctx.lineTo(arrCenterX[data.steps[i][1] - 1] + 10, stepY - 5);
            ctx.stroke();
            ctx.beginPath();       // Start a new path
            ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY);
            ctx.lineTo(arrCenterX[data.steps[i][1] - 1] + 10, stepY + 5);
            ctx.stroke();
        }
    }

    drawRectangularWithListeners(ctx, canvas, arrCenterX, stepY, i) {
        let rectangulStartX = (arrCenterX[data.steps[i][0] - 1] + arrCenterX[data.steps[i][1] - 1]) / 2 - 50
        let rectangulStartY = stepY - 30;
        ctx.fillStyle = "white";
        ctx.fillRect(rectangulStartX, rectangulStartY, 100, 25);
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(`${data.steps[i][2]}`, rectangulStartX + 5, rectangulStartY + 15);
        // Add event listener for `click` events.
        canvas.addEventListener('click', function (event) {
            const x = event.clientX - canvas.offsetLeft;
            const y = event.clientY - canvas.offsetTop + window.pageYOffset;
            if (x >= rectangulStartX && x <= rectangulStartX + 100 && y >= rectangulStartY && y <= rectangulStartY + 25) {
                window.open(`http://${data.steps[i][3]}`, '_blank');
            }
        });
    }

    drawSelfPointingArrow(ctx, circleRadius, stepY, arrCenterX, i) {
        const selfPointingArrpow = Number((this.canvasWidth / (5 * this.columnNumber)).toFixed());
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(arrCenterX[data.steps[i][0] - 1] + circleRadius, stepY);
        ctx.lineTo(arrCenterX[data.steps[i][1] - 1] + circleRadius + selfPointingArrpow, stepY);
        ctx.lineTo(arrCenterX[data.steps[i][1] - 1] + circleRadius + selfPointingArrpow, stepY + 40);
        ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY + 40);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY + 40);
        ctx.lineTo(arrCenterX[data.steps[i][1] - 1] + 10, stepY + 35);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY + 40);
        ctx.lineTo(arrCenterX[data.steps[i][1] - 1] + 10, stepY + 45);
        ctx.stroke();
    }

    render() {
        return (
            <div>
                <h1>Screen3</h1>
                <button style={styleButton} onClick={this.props.backToMain} >To Main Screen <b>1</b></button>
                <button style={styleButton} onClick={this.props.toScreenTwo} >To Screen <b>2</b></button>
                <canvas
                    ref="canvas"
                    width={this.canvasWidth}
                    height={this.canvasHeight}
                    style={{ border: '2px solid orange', margin: '0 auto', display: 'block' }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedItem: state.name
})

const mapDispatchToProps = {
    backToMain,
    toScreenTwo
}

ItemDiagram = connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemDiagram)

export default ItemDiagram;