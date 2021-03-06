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
        <Bar
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />

        {/* <Line
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        /> */}

        {/* <Pie
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        /> */}
      </div>
    )
  }
}

export default ChartPie
