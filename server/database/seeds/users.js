exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: 'Elon',
          last_name: 'Musk',
          email: 'bossman@tesla.com'
        },
        {
          first_name: 'Brad',
          last_name: 'Pitt',
          email: 'BP@fightclub.com'
        },
        {
          first_name: 'Wonder',
          last_name: 'Woman',
          email: 'bosslady@justice.com'
        }
      ]);
    })

    .then(function () {

      return knex('cards').del()
        .then(function () {
          return knex('cards').insert([
            {
              task: "Go to F45 & GET LIT",
              status: "DONE"
            },
            {
              task: "Log Caloric Intake",
              status: "DOING"
            },
            {
              task: "Meal Prep",
              status: "TO-DO"
            }
          ]);
        })

      // .then(function () {
      //   return knex('priorities').del()
      //     .then(function () {
      //       return knex('priorities').insert([
      //         {
      //           name: 'Workout',
      //           rank: 1,
      //         },
      //         {
      //           name: 'Diet',
      //           rank: 2,
      //         },
      //         {
      //           name: 'Chef it up',
      //           rank: 1,
      //         }
      //       ]);
      //     })

      // .then(function () {
      //   return knex('statuses').del()
      //     .then(function () {
      //       return knex('statuses').insert([
      //         {
      //           name: 'DONE',
      //           rank: 1,
      //         },
      //         {
      //           name: 'DOING',
      //           rank: 2,
      //         },
      //         {
      //           name: 'TO-DO',
      //           rank: 3,
      //         }
      //       ]);
      // });
      // })
    })
}


