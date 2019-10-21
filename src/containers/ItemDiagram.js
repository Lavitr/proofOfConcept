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

class ItemDiagram extends React.Component {
    constructor(props){
        super(props);
        this.selectedUserData= null;
        data.forEach(item => {
            if (this.props.selectedItem === item.name) {
                this.selectedUserData = item.data.a
            }
        })

    }

    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#CCC";
        ctx.fillRect(100, 0, 200, 700);
        ctx.fillStyle = "#FF0CCC";
        ctx.fillRect(300, 0, 200, 700);
        ctx.fillStyle = "#FFCC00";
        ctx.fillRect(500, 0, 200, 700);
        ctx.fillStyle = "#CCC111";
        ctx.fillRect(700, 0, 200, 700);

        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Law", 150, 50);
        ctx.fillText("Finance", 330, 50);
        ctx.fillText("Agency", 530, 50);
        ctx.fillText("Recruting", 730, 50);
        ctx.fillText("1", 767, 119);
        ctx.fillText("2", 810, 204);
        ctx.fillText("3", 168, 310);
        ctx.fillText("4", 810, 373);
        ctx.fillText("5", 567, 440);
        ctx.fillText("6", 770, 500);
        ctx.fillText("7", 810, 570);
        ctx.fillText("8", 371, 639);

        ctx.beginPath();       // Start a new path
        ctx.moveTo(100, 80);    // Move the pen to (30, 50)
        ctx.lineTo(900, 80);  // Draw a line to (150, 100)
        ctx.lineWidth = 4;
        ctx.stroke();
        //circle1
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(775, 110, 15, 0, 2 * Math.PI);
        ctx.stroke();
        //circle2
        ctx.beginPath();
        ctx.arc(820, 195, 15, 0, 2 * Math.PI);
        ctx.stroke();
        //circle3
        ctx.beginPath();
        ctx.arc(175, 300, 15, 0, 2 * Math.PI);
        ctx.stroke();
        //circle4
        ctx.beginPath();
        ctx.arc(820, 360, 15, 0, 2 * Math.PI);
        ctx.stroke();
        //circle5
        ctx.beginPath();
        ctx.arc(575, 430, 15, 0, 2 * Math.PI);
        ctx.stroke();
        //circle6
        ctx.beginPath();
        ctx.arc(775, 490, 15, 0, 2 * Math.PI);
        ctx.stroke();
        //circle7
        ctx.beginPath();
        ctx.arc(820, 560, 15, 0, 2 * Math.PI);
        ctx.stroke();
        //circle8
        ctx.beginPath();
        ctx.arc(380, 630, 15, 0, 2 * Math.PI);
        ctx.stroke();
        //////////////////////////Arrows1
        ctx.beginPath();       // Start a new path
        ctx.moveTo(790, 110);    // Move the pen to (30, 50)
        ctx.lineTo(880, 110);  // Draw a line to (150, 100)
        ctx.lineTo(880, 160);  // Draw a line to (150, 100)
        ctx.lineTo(800, 160);  // Draw a line to (150, 100)
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();       // Start a new path
        ctx.lineTo(810, 155);  // Draw a line to (150, 100)
        ctx.lineTo(800, 160);  // Draw a line to (150, 100)
        ctx.lineTo(810, 165);  // Draw a line to (150, 100)
        ctx.stroke();
        //////////////////////////Arrows2
        ctx.beginPath();       // Start a new path
        ctx.moveTo(200, 195);    // Move the pen to (30, 50)
        ctx.lineTo(800, 195);  // Draw a line to (150, 100)
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();       // Start a new path
        ctx.moveTo(210, 190);  // Draw a line to (150, 100)
        ctx.lineTo(200, 195);  // Draw a line to (150, 100)
        ctx.lineTo(210, 200);
        ctx.lineWidth = 2;
        ctx.stroke();
        //////////////////////////Arrows3
        ctx.beginPath();       // Start a new path
        ctx.moveTo(200, 300);    // Move the pen to (30, 50)
        ctx.lineTo(800, 300);  // Draw a line to (150, 100)
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();       // Start a new path
        ctx.moveTo(790, 295);  // Draw a line to (150, 100)
        ctx.lineTo(800, 300);  // Draw a line to (150, 100)
        ctx.lineTo(790, 305);
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dashed line1
        ctx.beginPath();
        ctx.setLineDash([15, 15]);
        ctx.moveTo(200, 87);
        ctx.lineTo(200, 700);
        ctx.lineWidth = 2;
        ctx.stroke();
        // Dashed line2
        ctx.beginPath();
        ctx.setLineDash([15, 15]);
        ctx.moveTo(400, 87);
        ctx.lineTo(400, 700);
        ctx.lineWidth = 2;
        ctx.stroke();
        // Dashed line3
        ctx.beginPath();
        ctx.setLineDash([15, 15]);
        ctx.moveTo(600, 87);
        ctx.lineTo(600, 700);
        ctx.lineWidth = 2;
        ctx.stroke();
        // Dashed line4
        ctx.beginPath();
        ctx.setLineDash([15, 15]);
        ctx.moveTo(800, 87);
        ctx.lineTo(800, 700);
        ctx.lineWidth = 2;
        ctx.stroke();
        /////////////////////////////////
        ctx.fillStyle = "white";
        ctx.fillRect(430, 165, 150, 25);
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText("Request contract", 460, 180);

        ctx.fillStyle = "white";
        ctx.fillRect(330, 265, 150, 25);
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText("Sign contract", 350, 280);

        // Add event listener for `click` events.
        const link=this.selectedUserData
        canvas.addEventListener('click', function (event) {
            const x = event.clientX - canvas.offsetLeft;
            const y = event.clientY - canvas.offsetTop;
            if (x >= 430 && x <= 580 && y >= 165 && y <= 190) {
                window.open (`http://${link}`, "mywindow","status=1,toolbar=1");
            }
            if (x >= 330 && x <= 480 && y >= 265 && y <= 290) {
                window.open (`http://${link}`, "mywindow","status=1,toolbar=1");
            }
        });
    }

    render() {
        return (
            <div>
                {/* <CanvasJSChart options={options} */}
                {/* /* onRef = {ref => this.chart = ref} */}
                {/* /> */}
                <button style={styleButton} onClick={() => { this.props.backToUsers(); }} >BACK</button>
                <div>{this.selectedUserData}</div>
                <canvas id="Canvas" ref="canvas" width={1000} height={700} style={{ border: '2px solid orange', margin: '0 auto', display: 'block' }} />
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