  const Web3 = require('web3');
  const Chart = require('chart.js');

  // Connect to Ganache
  const web3 = new Web3('http://localhost:7545');

  // Function to fetch block data from Ganache
  async function fetchBlockData() {
      const latestBlockNumber = await web3.eth.getBlockNumber();
      const blocks = [];

      for (let i = latestBlockNumber - 10; i <= latestBlockNumber; i++) {
          const block = await web3.eth.getBlock(i, true);
          blocks.push(block);
      }

      return blocks;
  }

  // Function to calculate transaction rate
  function calculateTransactionRate(blocks) {
      const transactionRates = [];
      const timestamps = [];

      blocks.forEach(block => {
          timestamps.push(new Date(block.timestamp * 1000).toLocaleTimeString());
          transactionRates.push(block.transactions.length);
      });

      return { timestamps, transactionRates };
  }

  // Function to plot transaction rates
  function plotTransactionRates(timestamps, transactionRates) {
      const ctx = document.getElementById('transactionRateChart').getContext('2d');
      const chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: timestamps,
              datasets: [{
                  label: 'Transactions Per Second',
                  data: transactionRates,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
  }

  // Main function
  async function main() {
      try {
          const blocks = await fetchBlockData();
          const { timestamps, transactionRates } = calculateTransactionRate(blocks);
          plotTransactionRates(timestamps, transactionRates);
      } catch (error) {
          console.error('Error:', error);
      }
  }

  // Call main function
  main();
