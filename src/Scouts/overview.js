import React, { useEffect, useState } from 'react'
import { FaAngleDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { PiChartBarFill } from "react-icons/pi";
import ReactApexChart from "react-apexcharts";
import { getLeadsPerClinicByDoctorId, getLeadsPerClinicByParentClinicId, getLeadsPerClinicByScoutId, getLeadsPerClinicByparentScoutId, getLoanDataByScoutId, getParentScoutTrendDataApi, getPotentialByParentScoutId, getPotentialByScoutId, getScoutTrendDataApi } from './actioncreator';
export default function Scoutoverview({ filter, setfilter }) {
  // const [filter, setfilter] = useState();

  const [graphfilter, setgraphfilter] = useState('Disbursed');
  const [graphswitch, setgraphswitch] = useState('count');
  const [typeData, settypeData] = useState('count');
  const [graphData, setGraphData] = useState([]);
  const [leadsPerClinic, setLeadsPerClinic] = useState('');
  const [loanData, setLoanData] = useState('');
  const [potentialData, setPotentialData] = useState('');


  // const chartData = {
  //   Aug: 750,
  //   Sept: 900,
  //   Oct: 550,
  //   Nov: 400,
  //   Dec: 600
  // };

  const chartData = graphData.reverse();

  const categories = chartData.map(data => `${data.month} ${data.year}`);
  const seriesData = chartData.map(data => data.value);

  const options = {
    chart: {
      type: 'bar',
      height: 250,
      toolbar: {
        show: false
      },
    },
    plotOptions: {
      bar: {
        borderRadius: '10px',
        horizontal: false,
        barHeight: '90%',
        columnWidth: '80%',
        borderRadius: 3,
        radius: 2,
        enableShades: true,
        shadeIntensity: 0.9,
        reverseNegativeShade: true,
        distributed: true,
        useFillColorAsStroke: false,
        colorScale: {
          ranges: [{
            from: 0,
            to: 0,
            color: undefined,
            foreColor: undefined,
            name: undefined,
          }],
          inverse: false,
          min: undefined,
          max: undefined
        },

      },
    },
    colors: ['#4B49AC'],
    fill: {
      colors: ['#4B49AC'],
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 1.8,
        gradientToColors: false,
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 1,
        colorStops: []
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {

      categories: categories,
      labels: {
        style: {
          // fontSize: '12px',
          // fontWeight: 400
        }
      },

    },
    tooltip: {
      y: {
        formatter: function (value) {
          return "Count: " + value;
        },
        title: {
          formatter: function (seriesName) {
            return ''
          }
        }
      },

    },
    legend: {
      show: false
    },

  };

  useEffect(() => {
    if (window.sessionStorage.getItem('role') === 'SCOUT') {
      getScoutTrendDataApi(window.sessionStorage.getItem('scoutId'), graphswitch, graphfilter, callback => {
        if (callback.message === 'success') {
          setGraphData(callback.data)
        }

      })
      getPotentialByScoutId(window.sessionStorage.getItem('scoutId'), callback => {
        setPotentialData(callback.data)
      })
      getLeadsPerClinicByScoutId(window.sessionStorage.getItem('scoutId'), callback => {
        if (callback.message === 'success') {
          setLeadsPerClinic(callback.data)
        }
      })
      getLoanDataByScoutId(window.sessionStorage.getItem('scoutId'), callback => {
        if (callback.message === 'success') {
          setLoanData(callback.data)
        }
      })
    }
    if (window.sessionStorage.getItem('role') === 'DOCTOR') {
      getLeadsPerClinicByDoctorId(window.sessionStorage.getItem('doctorId'), callback => {
        if (callback.message === 'success') {
          setLeadsPerClinic(callback.data)
        }
      })

    }
    if (window.sessionStorage.getItem('role') === 'PARENT_DOCTOR') {
      getLeadsPerClinicByParentClinicId(window.sessionStorage.getItem('parentDoctorId'), callback => {
        if (callback.message === 'success') {
          setLeadsPerClinic(callback.data)
        }
      })

    }
    if (window.sessionStorage.getItem('role') === 'PARENT_SCOUT') {
      getParentScoutTrendDataApi(window.sessionStorage.getItem('parentScoutId'), graphswitch, graphfilter, callback => {
        if (callback.message === 'success') {
          setGraphData(callback.data)
        }

      })
      getLeadsPerClinicByparentScoutId(window.sessionStorage.getItem('parentScoutId'), callback => {
        if (callback.message === 'success') {
          setLeadsPerClinic(callback.data)
        }
      })
      getPotentialByParentScoutId(window.sessionStorage.getItem('parentScoutId'), callback => {
        setPotentialData(callback.data)
      })


    }

  }, [])
  const graph = (data) => {
    setgraphfilter(data)
    if (window.sessionStorage.getItem('role') === 'SCOUT') {
      getScoutTrendDataApi(window.sessionStorage.getItem('scoutId'), graphswitch, data, callback => {
        if (callback.message === 'success') {
          setGraphData(callback.data)
        }

      })
      getLoanDataByScoutId(window.sessionStorage.getItem('scoutId'), callback => {
        if (callback.message === 'success') {
          setLoanData(callback.data)
        }
      })
    }
    if (window.sessionStorage.getItem('role') === 'DOCTOR') {

    }
    if (window.sessionStorage.getItem('role') === 'PARENT_DOCTOR') {

    }
    if (window.sessionStorage.getItem('role') === 'PARENT_SCOUT') {
      getParentScoutTrendDataApi(window.sessionStorage.getItem('scoutId'), graphswitch, data, callback => {
        if (callback.message === 'success') {
          setGraphData(callback.data)
        }

      })
    }

  }
  const graphTab = (data) => {
    setgraphswitch(data)

    if (window.sessionStorage.getItem('role') === 'SCOUT') {
      getScoutTrendDataApi(window.sessionStorage.getItem('scoutId'), data, graphfilter, callback => {
        if (callback.message === 'success') {
          setgraphfilter(callback.data)
        }

      })
    }
    if (window.sessionStorage.getItem('role') === 'DOCTOR') {

    }
    if (window.sessionStorage.getItem('role') === 'PARENT_DOCTOR') {

    }
    if (window.sessionStorage.getItem('role') === 'PARENT_SCOUT') {
      getParentScoutTrendDataApi(window.sessionStorage.getItem('scoutId'), data, graphfilter, callback => {
        if (callback.message === 'success') {
          setGraphData(callback.data)
        }

      })
    }
  }

  return (
    <>
      <div className="over-view-component screen-width-max" style={{ marginTop: '-10px', padding: '10px' }}>
        {console.log(chartData)}
        <div className={'trends'}>
          <div className="">
            <div className="" style={{ display: 'flex', width: '100%' }}>
              <div className='' style={{ width: '50%' }}>
                <div className="columns">
                  <div className="Lefttext">
                    <h3>{loanData.total_applied}</h3>
                    <h4>All loans</h4>
                  </div>
                  <div className="Righttext">
                    <h5>₹ {Number(loanData.total_loan_amount).toLocaleString()}</h5>
                  </div>
                </div>
              </div>
              <div className='' style={{ width: '50%' }}>
                <div className="columns">
                  <div className="Lefttext">
                    <h3>{loanData.disbursed_count}</h3>
                    <h4>Disbursed</h4>
                  </div>
                  <div className="Righttext">
                    <h5>₹ {Number(loanData.disbursed_amount).toLocaleString()}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="" style={{ display: 'flex', width: '100%' }}>

              <div className='' style={{ width: '50%' }}>
                <div className="box">
                  <div className="topbox">
                    <h3>Potential <br></br> Captured</h3>
                    <h5>{potentialData !== '' && potentialData.potential !== undefined ? potentialData.potential : ''}</h5>
                  </div>
                  <div className="bottombox">
                    <h3>Company <br></br> average</h3>
                    <h5>{potentialData !== '' && potentialData.carepayPotential !== undefined ? potentialData.carepayPotential : ''}</h5>
                  </div>
                </div>
              </div>
              <div className='' style={{ width: '50%' }}>
                <div className="box">
                  <div className="topbox">
                    <h3>Monthly leads
                      <br></br> per clinic </h3>
                    <h5>{leadsPerClinic.leadsPerClinic}</h5>
                  </div>
                  <div className="bottombox">
                    <h3>Company <br></br> average</h3>
                    <h5>{leadsPerClinic.leadsPerClinicCarepay ? leadsPerClinic.leadsPerClinicCarepay.toFixed(2) : ""}</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="row bargraph">
              <h5><span><PiChartBarFill /></span> Trend graphs</h5>
              <div className="tabsrow">
                <div className={`tabs ${graphfilter === 'Disbursed' ? 'showtabs' : ''}`} onClick={() => graph('Disbursed')}>
                  <h5>Disbursed {'(' + loanData.disbursed_count + ')'}</h5>
                </div>
                <div className={`tabs ${graphfilter === 'Approved' ? 'showtabs' : ''}`} onClick={() => graph('Approved')}>
                  <h5>Approved  {'(' + loanData.approved_count + ')'}</h5>
                </div>
                <div className={`tabs ${graphfilter === 'pending' ? 'showtabs' : ''}`} onClick={() => graph('pending')}>
                  <h5>Applied  {'(' + loanData.pending_count + ')'}</h5>
                </div>
                <div className={`tabs ${graphfilter === 'rejected' ? 'showtabs' : ''}`} onClick={() => graph('rejected')}>
                  <h5>Dropped  {'(' + loanData.rejected_count + ')'}</h5>
                </div>

              </div>

              <div className="buttonswitch">
                <div className="btnswitch">
                  <h5 className={`h5tab ${graphswitch === 'money' ? 'active' : ''}`} onClick={() => graphTab('money')}>Money </h5>&nbsp;
                  <h5 className={`h5tab ${graphswitch === 'count' ? 'active' : ''}`} onClick={() => graphTab('count')}>Count</h5>
                </div>
              </div>

              <div className="barchart">
                <div className="chart">
                  <ReactApexChart options={options} series={[{ data: seriesData }]} type="bar" height={250} width={'100%'} />
                </div>
                <div className="text">
                  <h5>This graph shows the number of loans <span>disbursed</span> successfully each month.</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        {console.log(filter, 'filter')}
        {/* {
          filter === 'scouts' ?
            <div className={`filter-dropdown animate__animated animate__slideInUp ${filter === 'scouts' ? 'show' : ''}`}>
              <div className="filterscout">
                <div className="filterbox">
                  <h5>Scouts</h5>&nbsp;<span><IoMdClose onClick={() => setfilter('')} className="closeicon" /></span>
                </div>
                <div className="checkboxes">
                  <div class="mb-3 form-check checkboxgrp">
                    <input type="checkbox" class="form-check-input checkboxinput" id="selectall" />
                    <label class="form-check-label checkboxinputlabel" for="selectall">Select All</label>
                  </div>
                  <div class="mb-3 form-check checkboxgrp">
                    <input type="checkbox" class="form-check-input checkboxinput" id="selectall" />
                    <label class="form-check-label checkboxinputlabel" for="selectall">Select All</label>
                  </div>
                </div>
                <div className="row filter-btn">
                  <button className='apply-filter'>Apply Filter</button>
                </div>
              </div>
            </div>
            : filter === 'amount' ?
              <div className={`filter-dropdown animate__animated animate__slideInUp ${filter === 'amount' ? 'show' : ''}`}>
                <div className="filterscout">
                  <div className="filterbox">
                    <h5>Amount</h5>&nbsp;<span><IoMdClose onClick={() => setfilter('')} className="closeicon" /></span>
                  </div>
                  <div className="inputsamount">
                    <div className="inputboxes">
                      <label htmlFor="minamount" className='iconruppee'>₹</label>
                      <input type="number" name="" className='amount' id='minamount' placeholder='Minimum amount' min='0' />
                    </div>
                    <h5>TO</h5>
                    <div className="inputboxes">
                      <label htmlFor="maxamount" className='iconruppee'>₹</label>
                      <input type="number" name="" className='amount' id='maxamount' placeholder='Maximum amount' min='0' />
                    </div>
                  </div>
                  <div className="row filter-btn">
                    <button className='apply-filter'>Apply Filter</button>
                  </div>
                </div>
              </div>
              : ''} */}
      </div>
    </>
  )
}
