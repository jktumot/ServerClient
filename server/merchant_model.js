const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Infobase',
  password: 'postgresFox2017',
  port: 5433,
});

const getMerchants = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM merchants ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createMerchant = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, email } = body

    pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Новый обьект добавлен: ${JSON.stringify(results.rows[0])}`)
    })
  })
}

const deleteMerchant = (merchantId) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(merchantId)

    pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Обьект с ID удалён: ${id}`)
    })
  })
}

module.exports = {
  getMerchants,
  createMerchant,
  deleteMerchant,
}