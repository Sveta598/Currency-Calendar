function longtermChart() {
  document.querySelector('.container').style.display = 'block';

  const currencyID = document.querySelector('.navigation__input_first').value;
  localStorage.setItem('curID', JSON.stringify(currencyID));
  const dayformat = 'YYYY-MM-DD';
  const datenow = dayjs();

  if(document.querySelector('.navigation__option27').selected === true) {
    year = datenow.subtract(1, 'y').format(dayformat).slice(0, 4);
  } else {
    year = datenow.format(dayformat).slice(0, 4);
  }

  localStorage.setItem('YearSelected', JSON.stringify(year));

  if(document.querySelector('.navigation__option1').selected === true) {
    currencyName = 'AUD';
  }
  else if(document.querySelector('.navigation__option2').selected === true){
    currencyName = 'BGN';
  }
  else if(document.querySelector('.navigation__option3').selected === true){
    currencyName = 'UAH';
  }
  else if(document.querySelector('.navigation__option4').selected === true){
    currencyName = 'DKK';
  }
  else if(document.querySelector('.navigation__option5').selected === true){
    currencyName = 'USD';
  }
  else if(document.querySelector('.navigation__option6').selected === true){
    currencyName = 'EUR';
  }
  else if(document.querySelector('.navigation__option7').selected === true){
    currencyName = 'PLN';
  }
  else if(document.querySelector('.navigation__option8').selected === true){
    currencyName = 'JPY';
  }
  else if(document.querySelector('.navigation__option9').selected === true){
    currencyName = 'IRR';
  }
  else if(document.querySelector('.navigation__option10').selected === true){
    currencyName = 'ISK';
  }
  else if(document.querySelector('.navigation__option11').selected === true){
    currencyName = 'CAD';
  }
  else if(document.querySelector('.navigation__option12').selected === true){
    currencyName = 'CNY';
  }
  else if(document.querySelector('.navigation__option13').selected === true){
    currencyName = 'KWD';
  }
  else if(document.querySelector('.navigation__option14').selected === true){
    currencyName = 'MDL';
  }
  else if(document.querySelector('.navigation__option15').selected === true){
    currencyName = 'NZD';
  }
  else if(document.querySelector('.navigation__option16').selected === true){
    currencyName = 'NOK';
  }
  else if(document.querySelector('.navigation__option17').selected === true){
    currencyName = 'RUB';
  }
  else if(document.querySelector('.navigation__option18').selected === true){
    currencyName = 'XDR';
  }
  else if(document.querySelector('.navigation__option19').selected === true){
    currencyName = 'SGD';
  }
  else if(document.querySelector('.navigation__option20').selected === true){
    currencyName = 'KGS';
  }
  else if(document.querySelector('.navigation__option21').selected === true){
    currencyName = 'KZT';
  } 
  else if(document.querySelector('.navigation__option22').selected === true){
    currencyName = 'TRY';
  }
  else if(document.querySelector('.navigation__option23').selected === true){
    currencyName = 'GBP';
  }
  else if(document.querySelector('.navigation__option24').selected === true){
    currencyName = 'CZK';
  }
  else if(document.querySelector('.navigation__option25').selected === true){
    currencyName = 'SEK';
  }
  else {
    currencyName = 'CHF';
  }

  localStorage.setItem('currency', JSON.stringify(currencyName));

  const url = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${currencyID}?startDate=${year}-01-01T00:00:00&endDate=${year}-12-31T00:00:00`;
  const worker = new Worker('js/worker5.js');
  worker.postMessage(url);
  worker.onmessage = function(e) {
    calculateResultArray (e.data);
  }

  const monthArray = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
  const resultArray = [];

  function calculateResultArray (quoteArray) {
    localStorage.setItem('Cur_OfficialRate', JSON.stringify(quoteArray));
    const janquotes = quoteArray.slice(0, 31);
    if(document.querySelector('.navigation__option27').selected === true) {
      febquotes = quoteArray.slice(31, 59);
      marchquotes = quoteArray.slice(59, 90);
      aprquotes = quoteArray.slice(90, 120);
      mayquotes = quoteArray.slice(120, 151);
      junequotes = quoteArray.slice(151, 181);
      julyquotes = quoteArray.slice(181, 212);
      augquotes = quoteArray.slice(212, 243);
      septquotes = quoteArray.slice(243, 273);
      octquotes = quoteArray.slice(273, 304);
      novquotes = quoteArray.slice(304, 334);
      decquotes = quoteArray.slice(334, 365);
    }
    else {
      febquotes = quoteArray.slice(31, 60);
      marchquotes = quoteArray.slice(60, 91);
      aprquotes = quoteArray.slice(91, 121);
      mayquotes = quoteArray.slice(121, 152);
      junequotes = quoteArray.slice(152, 182);
      julyquotes = quoteArray.slice(182, 213);
      augquotes = quoteArray.slice(213, 244);
      septquotes = quoteArray.slice(244, 274);
      octquotes = quoteArray.slice(274, 305);
      novquotes = quoteArray.slice(305, 335);
      decquotes = quoteArray.slice(335, 366);
    }

    const janQuoteSum = janquotes.reduce((a, b) => a + b, 0);
    const janAvgQuote = janQuoteSum / janquotes.length;

    resultArray.push({
      месяц: monthArray[0],
      курс: janAvgQuote,
    });

    const febQuoteSum = febquotes.reduce((a, b) => a + b, 0);
    const febAvgQuote = febQuoteSum / febquotes.length;

    resultArray.push({
      месяц: monthArray[1],
      курс: febAvgQuote,
    });

    const marchQuoteSum = marchquotes.reduce((a, b) => a + b, 0);
    const marchAvgQuote = marchQuoteSum / marchquotes.length;

    resultArray.push({
      месяц: monthArray[2],
      курс: marchAvgQuote,
    });

    const aprQuoteSum = aprquotes.reduce((a, b) => a + b, 0);
    const aprAvgQuote = aprQuoteSum / aprquotes.length;

    resultArray.push({
      месяц: monthArray[3],
      курс: aprAvgQuote,
    });

    const mayQuoteSum = mayquotes.reduce((a, b) => a + b, 0);
    const mayAvgQuote = mayQuoteSum / mayquotes.length;

    resultArray.push({
      месяц: monthArray[4],
      курс: mayAvgQuote,
    });

    const juneQuoteSum = junequotes.reduce((a, b) => a + b, 0);
    const juneAvgQuote = juneQuoteSum / junequotes.length;

    resultArray.push({
      месяц: monthArray[5],
      курс: juneAvgQuote,
    });

    const julyQuoteSum = julyquotes.reduce((a, b) => a + b, 0);
    const julyAvgQuote = julyQuoteSum / julyquotes.length;

    resultArray.push({
      месяц: monthArray[6],
      курс: julyAvgQuote,
    });

    const augQuoteSum = augquotes.reduce((a, b) => a + b, 0);
    const augAvgQuote = augQuoteSum / augquotes.length;

    resultArray.push({
      месяц: monthArray[7],
      курс: augAvgQuote,
    });

    const septQuoteSum = septquotes.reduce((a, b) => a + b, 0);
    const septAvgQuote = septQuoteSum / septquotes.length;

    resultArray.push({
      месяц: monthArray[8],
      курс: septAvgQuote,
    });

    const octQuoteSum = octquotes.reduce((a, b) => a + b, 0);
    const octAvgQuote = octQuoteSum / octquotes.length;

    resultArray.push({
      месяц: monthArray[9],
      курс: octAvgQuote,
    });

    const novQuoteSum = novquotes.reduce((a, b) => a + b, 0);
    const novAvgQuote = novQuoteSum / novquotes.length;

    resultArray.push({
      месяц: monthArray[10],
      курс: novAvgQuote,
    });

    const decQuoteSum = decquotes.reduce((a, b) => a + b, 0);
    const decAvgQuote = decQuoteSum / decquotes.length;

    resultArray.push({
      месяц: monthArray[11],
      курс: decAvgQuote,
    });

    drawChart(resultArray);

    localStorage.setItem('ResultArray', JSON.stringify(resultArray));
    
  }

function drawChart(data){
      const margin = {top:40, right:0, bottom:60, left:50},
            width  = 854 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

      const svg = d3.select(".container") 
            .append("svg")
            .attr("width", "95%")
            .attr("height", "90%")
            .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom));

      const chart = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
      const yScale = d3.scaleLinear()
            .range([height, 0]);

      const xScale = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        
          yScale.domain([0, d3.max(data, function(d){ return d["курс"]; })]);
          xScale.domain(data.map(function(d){ return d["месяц"]; }));
          
          chart.selectAll(".bar")
              .data(data)
              .enter()
              .append("rect")
              .attr("class", "bar")
              .attr("x", function(d){ return xScale(d["месяц"]); })
              .attr("y", function(d){ return yScale(d["курс"]); })
              .attr("height", function(d){ return height - yScale(d["курс"]); })
              .attr("width", function(d){ return xScale.bandwidth(); })
              .attr("fill", "#003366");
          
          svg.append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .selectAll(".textlabel")
              .data(data)
              .enter()
              .append("text")
              .attr("class", "textlabel")
              .attr("x", function(d){ return xScale(d["месяц"]) + (xScale.bandwidth()/2); })
              .attr("y", function(d){ return yScale(d["курс"])-1; })
              .attr("text-anchor", "middle")
              .attr("font-family", "sans-serif")
              .attr("font-size", "7px")
              .attr("font-weight", "bold")
              .text(function(d){ return d3.format("")(d["курс"]); })

          svg.append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .attr("font-weight", "bold")
              .call(d3.axisLeft(yScale).tickFormat(d3.format("")));

          svg.append("g")
              .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
              .call(d3.axisBottom(xScale))
                  .selectAll("text")
                  .style("font-size", "10px") 
                  .style("text-anchor", "end")
                  .attr("dx", "-.8em")
                  .attr("dy", ".15em")
                  .attr("font-weight", "bold")
                  .attr("transform", "rotate(-65)");
              
          svg.append("g")
              .attr("transform", "translate(" + (width/2) + ", 15)")
              .append("text")
              .text(`Изменение курса ${currencyName} за ${year} год`)
              .style("text-anchor", "middle")
              .style("font-family", "Arial")
              .style("font-weight", "bold");
}
}

