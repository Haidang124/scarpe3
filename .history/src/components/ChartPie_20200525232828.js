import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class ChartPie extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:{
          labels: ['Bostrap','Scarpe','Master','Luu Hai Dang'],
          datasets:[
              {
                  label:'Population',
                  data:[
                      111,
                      222,
                      333,
                      444,
                  ],
                  backgroundColor:[
                    'red',
                    'blue',
                    'gray',
                    '',
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
        <Bar
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
