import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class ChartPie extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:{
           labels: ['Complete','Scarpe','Luu Hai Dang'],
          datasets:[
              {
                  label:'Population',
                  data:[
                      30,
                      20,
                      50
                  ],
                  backgroundColor:[
                    '#ffc107',
                    '#17a2b8',
                    '#28a745',
                  ]
                  
              }
          ]
      }
    }
  }

//   static defaultProps = {
//     displayTitle:true,
//     displayLegend: true,
//     legendPosition:'right',
//     location:'City'
//   }

  render(){
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          options={{
           maintainAspectRatio:false
          }}
        />
      </div>
    )
  }
}

export default ChartPie
