import React, { useState, useEffect } from 'react'
import CanvasJSChart from '../canvasjs.react';
import { connect } from 'react-redux'
import { backToUsers } from '../actions'
import data from '../Data'

const styleButton = {
    display: 'block',
    marginBottom: '30px',
    height: '40px',
    width: '200px',
    backgroundColor: 'orange'
}

const colors = [
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
]

class ItemDiagram extends React.Component {
    constructor(props) {
        super(props);
        this.canvasWidth = document.body.offsetWidth * 4 / 5;
        this.columnNumber = data.columns.length;

        this.stepsNumber = data.steps.length;
        this.canvasHeight = this.stepsNumber * 80 + 110 + 50;
        this.selectedUserData = null;
    }

    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d");
        const columnWidth = Number((this.canvasWidth / this.columnNumber).toFixed());
        const selfPointingArrpow = Number((this.canvasWidth / (5 * this.columnNumber)).toFixed());
        let columnX = 0;
        let titleFont = `${25 * 4 / this.columnNumber + 5}px Arial`;
        for (let i = 0; i < this.columnNumber; i++) {
            ctx.fillStyle = colors[i];
            ctx.fillRect(columnX, 0, columnWidth, this.canvasHeight)
            //dashed lines
            ctx.beginPath();
            ctx.setLineDash([15, 15]);
            ctx.moveTo(columnX + columnWidth / 2, 87);
            ctx.lineTo(columnX + columnWidth / 2, this.canvasHeight);
            ctx.lineWidth = 1;
            ctx.stroke();
            //Column Title
            ctx.fillStyle = "black";

            ctx.font = titleFont;
            ctx.fillText(data.columns[i].name, columnX + 100 / this.columnNumber, 50);
            columnX = columnX + columnWidth;
        }
        ctx.setLineDash([]);
        const arrCenterX = [];
        for (let i = 0; i < this.columnNumber; i++) {
            arrCenterX.push(Number((columnWidth / 2).toFixed()) + i * columnWidth);
        }
        console.log('a', arrCenterX);
        // steps:[[4,4],[4,1],[1,3],[4,3],[3,4],[4,4],[4,2],[2,3]]
        let stepY = 110;
        let circleRadius = this.columnNumber > 5 ? 15 : 25
        for (let i = 0; i < this.stepsNumber; i++) {

            console.log(arrCenterX[data.steps[i][0] - 1]);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(arrCenterX[data.steps[i][0] - 1], stepY, circleRadius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.font = titleFont;
            ctx.fillText(`${i + 1}`, arrCenterX[data.steps[i][0] - 1] - 5, stepY + 5);
            let lineStart = data.steps[i][1] > data.steps[i][0] ? circleRadius : -circleRadius;
            if (data.steps[i][0] !== data.steps[i][1]) {
                ctx.beginPath();       // Start a new path
                ctx.moveTo(arrCenterX[data.steps[i][0] - 1] + lineStart, stepY);    // Move the pen to (30, 50)
                ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY);  // Draw a line to (150, 100)
                ctx.lineWidth = 2;
                ctx.stroke();
                //-------Arrow----------
                if (data.steps[i][1] > data.steps[i][0]) {
                    ctx.beginPath();       // Start a new path
                    ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY);  // Draw a line to (150, 100)
                    ctx.lineTo(arrCenterX[data.steps[i][1] - 1] - 10, stepY - 5);  // Draw a line to (150, 100)
                    ctx.stroke();
                    ctx.beginPath();       // Start a new path
                    ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY);  // Draw a line to (150, 100)
                    ctx.lineTo(arrCenterX[data.steps[i][1] - 1] - 10, stepY + 5);  // Draw a line to (150, 100)
                    ctx.stroke();
                } else {
                    ctx.beginPath();       // Start a new path
                    ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY);  // Draw a line to (150, 100)
                    ctx.lineTo(arrCenterX[data.steps[i][1] - 1] + 10, stepY - 5);  // Draw a line to (150, 100)
                    ctx.stroke();
                    ctx.beginPath();       // Start a new path
                    ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY);  // Draw a line to (150, 100)
                    ctx.lineTo(arrCenterX[data.steps[i][1] - 1] + 10, stepY + 5);  // Draw a line to (150, 100)
                    ctx.stroke();
                }
                //rectanguls
                let rectangulStart = (arrCenterX[data.steps[i][0] - 1] + arrCenterX[data.steps[i][1] - 1]) / 2 - 50
                let rectStartY = stepY - 30;
                ctx.fillStyle = "white";
                ctx.fillRect(rectangulStart, rectStartY, 100, 25);
                ctx.fillStyle = "black";
                ctx.font = "12px Arial";
                ctx.fillText(`${data.steps[i][2]}`, rectangulStart +5, rectStartY + 15);
                /////////
                // Add event listener for `click` events.
                canvas.addEventListener('click', function (event) {
                    const x = event.clientX - canvas.offsetLeft;
                    const y = event.clientY - canvas.offsetTop;
                    if (x >= rectangulStart && x <= rectangulStart + 100 && y >= rectStartY && y <= rectStartY + 25) {
                        window.open(`http://${ data.steps[i][3] }`, '_blank');
                    }
                });
            } else {
                ctx.lineWidth = 2;

                ctx.beginPath();       // Start a new path
                ctx.moveTo(arrCenterX[data.steps[i][0] - 1] + circleRadius, stepY);
                ctx.lineTo(arrCenterX[data.steps[i][1] - 1] + circleRadius + selfPointingArrpow, stepY);
                ctx.lineTo(arrCenterX[data.steps[i][1] - 1] + circleRadius + selfPointingArrpow, stepY + 40);
                ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY + 40);
                ctx.stroke();
                ctx.beginPath();       // Start a new path
                ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY + 40);  // Draw a line to (150, 100)
                ctx.lineTo(arrCenterX[data.steps[i][1] - 1] + 10, stepY + 35);  // Draw a line to (150, 100)
                ctx.stroke();
                ctx.beginPath();       // Start a new path
                ctx.lineTo(arrCenterX[data.steps[i][1] - 1], stepY + 40);  // Draw a line to (150, 100)
                ctx.lineTo(arrCenterX[data.steps[i][1] - 1] + 10, stepY + 45);  // Draw a line to (150, 100)
                ctx.stroke();
            }

            stepY = stepY + 80;
        }

        ctx.beginPath();
        // Start a new path
        ctx.moveTo(0, 80);    // Move the pen to (30, 50)
        ctx.lineTo(this.canvasWidth, 80);  // Draw a line to (150, 100)
        ctx.lineWidth = 3;
        ctx.stroke();

    }

    render() {
        return (
            <div>
                <button style={styleButton} onClick={() => { this.props.backToUsers(); }} >BACK</button>
                {/* <div>{this.selectedUserData}</div> */}
                <canvas id="Canvas" ref="canvas" width={this.canvasWidth} height={this.canvasHeight} style={{ border: '2px solid orange', margin: '0 auto', display: 'block' }} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedItem: state.name
})

const mapDispatchToProps = {
    backToUsers
}

ItemDiagram = connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemDiagram)

export default ItemDiagram;