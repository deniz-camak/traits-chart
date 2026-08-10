const API_URL =
  "https://script.google.com/macros/s/AKfycbyFlt0ZhHcSPDs0Hy9cI3YihABR6lSMvZ5r_nOHNliimz4BnePSDFUO-8tQeDYznkTBxQ/exec";


async function loadTraits() {

  try {

    const response =
      await fetch(API_URL);

    if (!response.ok) {

      throw new Error(
        "could not connect to the trait server."
      );

    }


    const stats =
      await response.json();


    drawChart(stats);


  } catch (error) {

    document.getElementById("loading").innerHTML =
      "⚠️ unable to load traits.";

    console.error(error);

  }

}


function drawChart(stats) {

  document.getElementById("loading")
    .style.display = "none";


  const ctx =
    document
      .getElementById("traitChart")
      .getContext("2d");


  new Chart(ctx, {

    type: "radar",


    data: {

      labels: [

        "creativity",

        "wisdom",

        "strength",

        "charisma",

        "constitution",

        "exploration"

      ],


      datasets: [{

        data: [

          stats.creativity,

          stats.wisdom,

          stats.strength,

          stats.charisma,

          stats.constitution,

          stats.exploration

        ],


        backgroundColor:
          "rgba(175, 115, 255, 0.25)",


        borderColor:
          "#b77cff",


        borderWidth: 3,


        pointBackgroundColor:
          "#d8b5ff",


        pointBorderColor:
          "#ffffff",


        pointBorderWidth: 2,


        pointRadius: 5

      }]

    },


    options: {

      responsive: true,

      maintainAspectRatio: false,


      scales: {

        r: {

          min: 0,

          max: 1,


          ticks: {

            display: false

          },


          grid: {

            color:
              "rgba(180, 130, 255, 0.20)"

          },


          angleLines: {

            color:
              "rgba(180, 130, 255, 0.20)"

          },


          pointLabels: {

  color: "#ffffff",

  padding: 12,

  font: function(context) {

    const width = window.innerWidth;

    let size = 14;

    if (width <= 700) {
      size = 12;
    }

    if (width <= 450) {
      size = 10;
    }

    return {
      family: "Georgia",
      size: size,
      weight: "bold"
    };

  }

          }

        }

      },


      plugins: {

        legend: {

          display: false

        },


        tooltip: {

          callbacks: {

            label: function(context) {

              return (
                " " +
                Math.round(context.raw * 100) +
                "%"
              );

            }

          }

        }

      }

    }

  });

}


loadTraits();
