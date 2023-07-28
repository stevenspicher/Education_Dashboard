import "../css/search.css"
const School = () => {
    return (
        <>
    <div className="search-block">
        <div className="app-search">
            <a href="../../"><img src="../../assets/home.png"/></a>
            <div className="search-row">
                <input id="fill-box" type="text" placeholder="Search school or district ..."/>
                    <i className="fa fa-search"></i>
            </div>
        </div>
        <div id="suggestions-list" className="list-items"></div>
    </div>
    {/*</div>*/}
    <div className="container">
        <div id="title">
            <h1>Iva Elementary School</h1>
            <h3>Anderson School District 3</h3>
            <h4>803 Antreville Hwy, Iva </h4>
            <h4>385 students, 30 teachers</h4>
        </div>
        <div className="row">
            <div className="col-12 col-md-12 graphic">
                <div className="graphic-style">
                    <h5>Academic Performance</h5>
                    <div className="row">
                        <div className="col-sm-4">
                            <canvas id="chart-reading"></canvas>
                        </div>
                        <div className="col-sm-4">
                            <canvas id="chart-math"></canvas>
                        </div>
                        <div className="col-sm-4">
                            <canvas id="chart-science"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-12 graphic">
                <div className="graphic-style">
                    <h5>Demographics</h5>
                    <div className="row">
                        <div className="col-sm-4">
                            <canvas id="chart-poverty"></canvas>
                        </div>
                        <div className="col-sm-4">
                            <canvas id="chart-disabilities"></canvas>
                        </div>
                        <div className="col-sm-4">
                            <canvas id="chart-english-learners"></canvas>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <canvas id="chart-race"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 graphic">
                <div className="graphic-style">
                    <div id="chart-harrassment"></div>
                </div>
            </div>
            <div className="col-md-4 graphic">
                <div className="graphic-style">
                    <div id="chart-teacherpay"></div>
                </div>
            </div>
            <div className="col-md-4 graphic">
                <div className="graphic-style">
                    <div id="chart-childsafe"></div>
                </div>
            </div>
            <div className="col-12 col-md-4 graphic">
                <div className="graphic-style">
                    <div id="chart-teachersafe"></div>
                </div>
            </div>
            <div className="col-12 col-md-4 graphic">
                <div className="graphic-style">
                    <div id="chart-violent"></div>
                </div>
            </div>
        </div>
    </div>


  {/*Chart.register(ChartDataLabels);*/}

  {/*      const name = `Iva Elementary School`*/}

  {/*      new Chart(*/}
  {/*      document.getElementById('chart-reading'), {*/}
  {/*      type: 'bar',*/}
  {/*      data: {*/}
  {/*      labels: [*/}
  {/*      'Students with Positive Reading Score'*/}
  {/*      ],*/}
  {/*      datasets: [{*/}
  {/*      label: name,*/}
  {/*      backgroundColor: 'rgb(255, 99, 132)',*/}
  {/*      borderColor: 'rgb(255, 99, 132)',*/}
  {/*      data: [`68.5` === 'NA' ? 0 : `68.5`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*  {*/}
  {/*      label: 'District Average',*/}
  {/*      backgroundColor: 'rgb(63,183,73)',*/}
  {/*      borderColor: 'rgb(63,183,73)',*/}
  {/*      data: [`54.9` === 'NA' ? 0 : `54.9`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*  {*/}
  {/*      label: 'State Average',*/}
  {/*      backgroundColor: 'rgb(30,144,255)',*/}
  {/*      borderColor: 'rgb(30,144,255)',*/}
  {/*      data: [`45.22699696663287` === 'NA' ? 0 : `45.22699696663287`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  }]*/}
  {/*  },*/}
  {/*      options: {*/}
  {/*      maintainAspectRatio: false,*/}
  {/*      scales: {*/}
  {/*      y: {*/}
  {/*      max: 100,*/}
  {/*      ticks: {*/}
  {/*      callback: function(value, index, ticks) {*/}
  {/*      return `${value}%`*/}
  {/*  }*/}
  {/*  },*/}
  {/*  },*/}
  {/*  },*/}
  {/*      plugins: {*/}
  {/*      datalabels: {*/}
  {/*      formatter: (value, ctx) => {*/}
  {/*      if (value !== 0) {*/}
  {/*      return Math.round(value) + '%';*/}
  {/*  } else {*/}
  {/*      return 'N/A'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      anchor: 'end',*/}
  {/*      align: (value, ctx) => {*/}
  {/*      if (value.dataset.data[0] > 30) {*/}
  {/*      return 'bottom'*/}
  {/*  }*/}
  {/*      else {*/}
  {/*      return 'top'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      font: {*/}
  {/*      weight: 'bold'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      tooltips: {*/}
  {/*      callbacks: {*/}
  {/*      label: function(context) {*/}
  {/*      return context.dataset.label + '%';*/}
  {/*  },*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*      );*/}

  {/*      new Chart(*/}
  {/*      document.getElementById('chart-math'), {*/}
  {/*      type: 'bar',*/}
  {/*      data: {*/}
  {/*      labels: [*/}
  {/*      'Students with Positive Math Score'*/}
  {/*      ],*/}
  {/*      datasets: [{*/}
  {/*      label: name,*/}
  {/*      backgroundColor: 'rgb(255, 99, 132)',*/}
  {/*      borderColor: 'rgb(255, 99, 132)',*/}
  {/*      data: [`54.3` === 'NA' ? 0 : `54.3`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*  {*/}
  {/*      label: 'District Average',*/}
  {/*      backgroundColor: 'rgb(63,183,73)',*/}
  {/*      borderColor: 'rgb(63,183,73)',*/}
  {/*      data: [`46.7` === 'NA' ? 0 : `46.7`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*  {*/}
  {/*      label: 'State Average',*/}
  {/*      backgroundColor: 'rgb(30,144,255)',*/}
  {/*      borderColor: 'rgb(30,144,255)',*/}
  {/*      data: [`39.478926038500525` === 'NA' ? 0 : `39.478926038500525`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  }]*/}
  {/*  },*/}
  {/*      options: {*/}
  {/*      maintainAspectRatio: false,*/}
  {/*      scales: {*/}
  {/*      y: {*/}
  {/*      max: 100,*/}
  {/*      ticks: {*/}
  {/*      callback: function(value, index, ticks) {*/}
  {/*      return `${value}%`*/}
  {/*  }*/}
  {/*  },*/}
  {/*  },*/}
  {/*  },*/}
  {/*      plugins: {*/}
  {/*      datalabels: {*/}
  {/*      formatter: (value, ctx) => {*/}
  {/*      if (value !== 0) {*/}
  {/*      return Math.round(value) + '%';*/}
  {/*  } else {*/}
  {/*      return 'N/A'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      anchor: 'end',*/}
  {/*      align: (value, ctx) => {*/}
  {/*      if (value.dataset.data[0] > 30) {*/}
  {/*      return 'bottom'*/}
  {/*  }*/}
  {/*      else {*/}
  {/*      return 'top'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      font: {*/}
  {/*      weight: 'bold'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      legend: {*/}
  {/*      display: false*/}
  {/*  },*/}
  {/*      tooltips: {*/}
  {/*      callbacks: {*/}
  {/*      label: function(context) {*/}
  {/*      return context.dataset.label + '%';*/}
  {/*  },*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*      );*/}

  {/*      new Chart(*/}
  {/*      document.getElementById('chart-science'), {*/}
  {/*      type: 'bar',*/}
  {/*      data: {*/}
  {/*      labels: [*/}
  {/*      'Students with Positive Science Score'*/}
  {/*      ],*/}
  {/*      datasets: [{*/}
  {/*      label: name,*/}
  {/*      backgroundColor: 'rgb(255, 99, 132)',*/}
  {/*      borderColor: 'rgb(255, 99, 132)',*/}
  {/*      data: [`84.8` === 'NA' ? 0 : `84.8`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*  {*/}
  {/*      label: 'District Average',*/}
  {/*      backgroundColor: 'rgb(63,183,73)',*/}
  {/*      borderColor: 'rgb(63,183,73)',*/}
  {/*      data: [`60.4` === 'NA' ? 0 : `60.4`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*  {*/}
  {/*      label: 'State Average',*/}
  {/*      backgroundColor: 'rgb(30,144,255)',*/}
  {/*      borderColor: 'rgb(30,144,255)',*/}
  {/*      data: [`33.923712183156155` === 'NA' ? 0 : `33.923712183156155`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  }]*/}
  {/*  },*/}
  {/*      options: {*/}
  {/*      maintainAspectRatio: false,*/}
  {/*      scales: {*/}
  {/*      y: {*/}
  {/*      max: 100,*/}
  {/*      ticks: {*/}
  {/*      callback: function(value, index, ticks) {*/}
  {/*      return `${value}%`*/}
  {/*  }*/}
  {/*  },*/}
  {/*  },*/}
  {/*  },*/}
  {/*      plugins: {*/}
  {/*      datalabels: {*/}
  {/*      formatter: (value, ctx) => {*/}
  {/*      if (value !== 0) {*/}
  {/*      return Math.round(value) + '%';*/}
  {/*  } else {*/}
  {/*      return 'N/A'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      anchor: 'end',*/}
  {/*      align: (value, ctx) => {*/}
  {/*      if (value.dataset.data[0] > 30) {*/}
  {/*      return 'bottom'*/}
  {/*  }*/}
  {/*      else {*/}
  {/*      return 'top'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      font: {*/}
  {/*      weight: 'bold'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      legend: {*/}
  {/*      display: false*/}
  {/*  },*/}
  {/*      tooltips: {*/}
  {/*      callbacks: {*/}
  {/*      label: function(context) {*/}
  {/*      return context.dataset.label + '%';*/}
  {/*  },*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*      );*/}

  {/*      new Chart(*/}
  {/*      document.getElementById('chart-race'), {*/}
  {/*      type: 'bar',*/}
  {/*      data: {*/}
  {/*      labels: [*/}
  {/*      'White',*/}
  {/*      'Black',*/}
  {/*      'Other'*/}
  {/*      ],*/}
  {/*      datasets: [{*/}
  {/*      label: name,*/}
  {/*      backgroundColor: 'rgb(255, 99, 132)',*/}
  {/*      borderColor: 'rgb(255, 99, 132)',*/}
  {/*      data: [*/}
  {/*      `54.64` === 'NA' ? 0 : `54.64`,*/}
  {/*      `24.41` === 'NA' ? 0 : `24.41`,*/}
  {/*      `20.95` === 'NA' ? 0 : `20.95`,*/}
  {/*      ],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*  {*/}
  {/*      label: 'District Average',*/}
  {/*      backgroundColor: 'rgb(63,183,73)',*/}
  {/*      borderColor: 'rgb(63,183,73)',*/}
  {/*      data: [*/}
  {/*      `79` === 'NA' ? 0 : `79`,*/}
  {/*      `9.1` === 'NA' ? 0 : `9.1`,*/}
  {/*      `6.2` === 'NA' ? 0 : `6.2`,*/}
  {/*      ],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*  {*/}
  {/*      label: 'State Average',*/}
  {/*      backgroundColor: 'rgb(30,144,255)',*/}
  {/*      borderColor: 'rgb(30,144,255)',*/}
  {/*      data: [*/}
  {/*      `45.84081016679899` === 'NA' ? 0 : `45.84081016679899`,*/}
  {/*      `37.026899753415385` === 'NA' ? 0 : `37.026899753415385`,*/}
  {/*      `17.119062748212873` === 'NA' ? 0 : `17.119062748212873`,*/}
  {/*      ],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*      ]},*/}
  {/*      options: {*/}
  {/*      maintainAspectRatio: false,*/}
  {/*      scales: {*/}
  {/*      y: {*/}
  {/*      max: 100,*/}
  {/*      ticks: {*/}
  {/*      callback: function(value, index, ticks) {*/}
  {/*      return `${value}%`*/}
  {/*  }*/}
  {/*  },*/}
  {/*  },*/}
  {/*  },*/}
  {/*      plugins: {*/}
  {/*      datalabels: {*/}
  {/*      formatter: (value, ctx) => {*/}
  {/*      if (value !== 0) {*/}
  {/*      return Math.round(value) + '%';*/}
  {/*  } else {*/}
  {/*      return 'N/A'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      anchor: 'end',*/}
  {/*      align: (value, ctx) => {*/}
  {/*      if (value.dataset.data[value.dataIndex] > 30) {*/}
  {/*      return 'bottom'*/}
  {/*  }*/}
  {/*      else {*/}
  {/*      return 'top'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      font: (context) => {*/}
  {/*      var avgSize = Math.round((context.chart.height + context.chart.width) / 2);*/}
  {/*      var size = Math.round(avgSize / 32);*/}
  {/*      size = size > 12 ? 12 : size + 1;*/}
  {/*      return {*/}
  {/*      size,*/}
  {/*      weight: 'bold'*/}
  {/*  }*/}
  {/*  }*/}
  {/*  },*/}
  {/*      tooltips: {*/}
  {/*      callbacks: {*/}
  {/*      label: function(context) {*/}
  {/*      return context.dataset.label + '%';*/}
  {/*  },*/}
  {/*  }*/}
  {/*  },*/}
  {/*      legend: {*/}
  {/*      display: false*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*      );*/}

  {/*      new Chart(*/}
  {/*      document.getElementById('chart-poverty'), {*/}
  {/*      type: 'bar',*/}
  {/*      data: {*/}
  {/*      labels: [*/}
  {/*      'Students in Poverty',*/}
  {/*      ],*/}
  {/*      datasets: [{*/}
  {/*      label: name,*/}
  {/*      backgroundColor: 'rgb(255, 99, 132)',*/}
  {/*      borderColor: 'rgb(255, 99, 132)',*/}
  {/*      data: [`0.76` === 'NA' ? 0 : `0.76`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*  {*/}
  {/*      label: 'District Average',*/}
  {/*      backgroundColor: 'rgb(63,183,73)',*/}
  {/*      borderColor: 'rgb(63,183,73)',*/}
  {/*      data: [`68.6` === 'NA' ? 0 : `68.6`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*  {*/}
  {/*      label: 'State Average',*/}
  {/*      backgroundColor: 'rgb(30,144,255)',*/}
  {/*      borderColor: 'rgb(30,144,255)',*/}
  {/*      data: [`0.6851351351351346` === 'NA' ? 0 : `0.6851351351351346`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  }]*/}
  {/*  },*/}
  {/*      options: {*/}
  {/*      legend: {*/}
  {/*      display: false,*/}
  {/*  },*/}
  {/*      maintainAspectRatio: false,*/}
  {/*      scales: {*/}
  {/*      y: {*/}
  {/*      max: 100,*/}
  {/*      ticks: {*/}
  {/*      callback: function(value, index, ticks) {*/}
  {/*      return `${value}%`*/}
  {/*  }*/}
  {/*  },*/}
  {/*      title: {*/}
  {/*      display: false,*/}
  {/*      text: 'Percentage of Students with Satisfactory Scores'*/}
  {/*  }*/}
  {/*  }*/}
  {/*  },*/}
  {/*      plugins: {*/}
  {/*      datalabels: {*/}
  {/*      formatter: (value, ctx) => {*/}
  {/*      if (value !== 0) {*/}
  {/*      return Math.round(value) + '%';*/}
  {/*  } else {*/}
  {/*      return 'N/A'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      anchor: 'end',*/}
  {/*      align: (value, ctx) => {*/}
  {/*      if (value.dataset.data[0] > 30) {*/}
  {/*      return 'bottom'*/}
  {/*  }*/}
  {/*      else {*/}
  {/*      return 'top'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      font: {*/}
  {/*      weight: 'bold'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      tooltips: {*/}
  {/*      callbacks: {*/}
  {/*      label: function(context) {*/}
  {/*      return context.dataset.label + '%';*/}
  {/*  },*/}
  {/*  }*/}
  {/*  },*/}
  {/*      legend: {*/}
  {/*      display: true*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*      );*/}

  {/*      new Chart(*/}
  {/*      document.getElementById('chart-disabilities'), {*/}
  {/*      type: 'bar',*/}
  {/*      data: {*/}
  {/*      labels: [*/}
  {/*      'Students with Disabilities',*/}
  {/*      ],*/}
  {/*      datasets: [{*/}
  {/*      label: name,*/}
  {/*      backgroundColor: 'rgb(255, 99, 132)',*/}
  {/*      borderColor: 'rgb(255, 99, 132)',*/}
  {/*      data: [`20.94717668` === 'NA' ? 0 : `20.94717668`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*  {*/}
  {/*      label: 'District Average',*/}
  {/*      backgroundColor: 'rgb(63,183,73)',*/}
  {/*      borderColor: 'rgb(63,183,73)',*/}
  {/*      data: [`16` === 'NA' ? 0 : `16`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*  {*/}
  {/*      label: 'State Average',*/}
  {/*      backgroundColor: 'rgb(30,144,255)',*/}
  {/*      borderColor: 'rgb(30,144,255)',*/}
  {/*      data: [`18.434936157565645` === 'NA' ? 0 : `18.434936157565645`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  }]*/}
  {/*  },*/}
  {/*      options: {*/}
  {/*      legend: {*/}
  {/*      display: false,*/}
  {/*  },*/}
  {/*      maintainAspectRatio: false,*/}
  {/*      scales: {*/}
  {/*      y: {*/}
  {/*      max: 100,*/}
  {/*      ticks: {*/}
  {/*      callback: function(value, index, ticks) {*/}
  {/*      return `${value}%`*/}
  {/*  }*/}
  {/*  },*/}
  {/*  }*/}
  {/*  },*/}
  {/*      plugins: {*/}
  {/*      datalabels: {*/}
  {/*      formatter: (value, ctx) => {*/}
  {/*      if (value !== 0) {*/}
  {/*      return Math.round(value) + '%';*/}
  {/*  } else {*/}
  {/*      return 'N/A'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      anchor: 'end',*/}
  {/*      align: (value, ctx) => {*/}
  {/*      if (value.dataset.data[0] > 30) {*/}
  {/*      return 'bottom'*/}
  {/*  }*/}
  {/*      else {*/}
  {/*      return 'top'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      font: {*/}
  {/*      weight: 'bold'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      legend: {*/}
  {/*      display: false,*/}
  {/*  },*/}
  {/*      tooltips: {*/}
  {/*      callbacks: {*/}
  {/*      label: function(context) {*/}
  {/*      return context.dataset.label + '%';*/}
  {/*  },*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*      );*/}

  {/*      new Chart(*/}
  {/*      document.getElementById('chart-english-learners'), {*/}
  {/*      type: 'bar',*/}
  {/*      data: {*/}
  {/*      labels: [*/}
  {/*      'English Language Learning Students',*/}
  {/*      ],*/}
  {/*      datasets: [{*/}
  {/*      label: name,*/}
  {/*      backgroundColor: 'rgb(255, 99, 132)',*/}
  {/*      borderColor: 'rgb(255, 99, 132)',*/}
  {/*      data: [`10.93` === 'NA' ? 0 : `10.93`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*  {*/}
  {/*      label: 'District Average',*/}
  {/*      backgroundColor: 'rgb(63,183,73)',*/}
  {/*      borderColor: 'rgb(63,183,73)',*/}
  {/*      data: [`2.3` === 'NA' ? 0 : `2.3`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  },*/}
  {/*  {*/}
  {/*      label: 'State Average',*/}
  {/*      backgroundColor: 'rgb(30,144,255)',*/}
  {/*      borderColor: 'rgb(30,144,255)',*/}
  {/*      data: [`9.025716694772363` === 'NA' ? 0 : `9.025716694772363`],*/}
  {/*      barPercentage: 1.0,*/}
  {/*      categoryPercentage: 0.6,*/}
  {/*  }]*/}
  {/*  },*/}
  {/*      options: {*/}
  {/*      legend: {*/}
  {/*      display: false,*/}
  {/*  },*/}
  {/*      maintainAspectRatio: false,*/}
  {/*      scales: {*/}
  {/*      y: {*/}
  {/*      max: 100,*/}
  {/*      ticks: {*/}
  {/*      callback: function(value, index, ticks) {*/}
  {/*      return `${value}%`*/}
  {/*  }*/}
  {/*  },*/}
  {/*  }*/}
  {/*  },*/}
  {/*      plugins: {*/}
  {/*      datalabels: {*/}
  {/*      formatter: (value, ctx) => {*/}
  {/*      if (value !== 0) {*/}
  {/*      return Math.round(value) + '%';*/}
  {/*  } else {*/}
  {/*      return 'N/A'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      anchor: 'end',*/}
  {/*      align: (value, ctx) => {*/}
  {/*      if (value.dataset.data[0] > 30) {*/}
  {/*      return 'bottom'*/}
  {/*  }*/}
  {/*      else {*/}
  {/*      return 'top'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      font: {*/}
  {/*      weight: 'bold'*/}
  {/*  }*/}
  {/*  },*/}
  {/*      legend: {*/}
  {/*      display: false,*/}
  {/*  },*/}
  {/*      tooltips: {*/}
  {/*      callbacks: {*/}
  {/*      label: function(context) {*/}
  {/*      return context.dataset.label + '%';*/}
  {/*  },*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*  }*/}
  {/*      );*/}

  {/*      function drawStat(graphic,data){*/}
  {/*      var chartWidth = $(graphic).width()*/}

  {/*      var margin = {*/}
  {/*      top: 0,*/}
  {/*      right: 0,*/}
  {/*      bottom: 25,*/}
  {/*      left: 0*/}
  {/*  }*/}

  {/*      const div = d3.select(graphic)*/}
  {/*      .append("div")*/}
  {/*      .style("width", `100%`)*/}
  {/*      .style("height", `100%`)*/}
  {/*      .style("text-align","center")*/}
  {/*      .style("margin", "auto")*/}
  {/*      .selectAll(null)*/}
  {/*      .data(data)*/}
  {/*      .enter()*/}


  {/*      const num = div*/}
  {/*      .append("h1")*/}
  {/*      .text(function (d) {*/}
  {/*      return `${d.value}`*/}
  {/*  })*/}
  {/*      //.style("font-size","84px")*/}
  {/*      .style("color","#82C566")*/}
  {/*      .style("font-family","miller-headline")*/}
  {/*      .style("font-weight","700")*/}

  {/*      const text = div*/}
  {/*      .append("h5")*/}
  {/*      .text(function (d) {*/}
  {/*      return d.label*/}
  {/*  })*/}

  {/*  }*/}

  {/*      function formatComma(float){*/}
  {/*      num = Math.round(float)*/}
  {/*      return num.toLocaleString("en-US")*/}
  {/*  }*/}

        {/*const dataTeacherpayStat = [*/}
        {/*{ label: "Average teacher pay", value: `${'' === 'NA' ? 'N/A' : '$' + formatComma(53518)}` }*/}
        {/*]*/}

        {/*const dataChildsafeStat = [*/}
        {/*{ label: 'Parents who agree "my child feels safe at school"', value: `${'91' === 'NA' ? 'N/A' : formatComma(91) + '%'}` }*/}
        {/*]*/}

        {/*const dataTeachersafeStat = [*/}
        {/*{ label: 'Teachers who agree "I feel safe at my school"', value: `${'100' === 'NA' ? 'N/A' : formatComma(100) + '%'}` }*/}
        {/*]*/}

        {/*const dataViolentassaultsStat = [*/}
        {/*{ label: 'Number of violent assaults', value: `${'0' === 'NA' ? 'N/A' : formatComma(0)}` }*/}
        {/*]*/}

        {/*const dataHarrassmentStat = [*/}
        {/*{ label: 'Number of incidents of bullying or harrassment', value: `${'2' === 'NA' ? 'N/A' : formatComma(2)}` }*/}
        {/*]*/}

        {/*searchApp("school")*/}

        {/*drawStat("#chart-teacherpay",dataTeacherpayStat)*/}
        {/*drawStat("#chart-childsafe",dataChildsafeStat)*/}
        {/*drawStat("#chart-teachersafe",dataTeachersafeStat)*/}
        {/*drawStat("#chart-violent",dataViolentassaultsStat)*/}
        {/*drawStat("#chart-harrassment",dataHarrassmentStat)*/}





    </>
    )
};
        export default School

