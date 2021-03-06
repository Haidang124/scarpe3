import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class ChartPie extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:{
          labels: ['Bostrap','Scarpe','Master','Luu Hai Dang'],
          dataset:[
              {
                  label:'Population',
                  data:[
                      111,
                      222,
                      333,
                      444,
                  ],
                  backgroundColor:[
                    'rgba(255,99,132,0.6)',
                    'rgba(225,99,132,0.6)',
                    'rgba(25,99,132,0.6)',
                    'rgba(245,99,132,0.6)',
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
