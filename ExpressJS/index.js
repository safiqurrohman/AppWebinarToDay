require('dotenv').config()

const app = require('express')();
const PORT = 8000;
const bodyParser = require('body-parser');
const db = require('./connection');
const response = require('./response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const secretKey = '161fc85f535615e1b630c59fe4f9d54cfe0dd824a174455f2aefd46fca9b69a1';
const multer = require('multer');

app.use(cors());
app.use(bodyParser.json({limit: '5000kb'}))


// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     next();
// })



// Use multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Set the file size limit to 10 MB
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/webinar-list", (req, res) => {
    const sql = "SELECT * FROM webinar"
    db.query(sql, (err, result)=> {
        if (err) throw err;
        response(200, result, "webinars get list", res)
    })
})

//nampilin webinar jika view lebih dari 100
app.get("/webinar-toplist", (req, res) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const sql = `SELECT * FROM webinar WHERE views > 100 AND waktu > '${currentDate}'`;
    db.query(sql, (err, result)=> {
        if (err) throw err;
        response(200, result, "webinars get list views > 100", res)
    })
})

//logika views
app.put('/increment-views/:webinar_id', (req, res) => {
    const { webinar_id } = req.params;

    const sql = `UPDATE webinar SET views = views + 1 WHERE webinar_id = ?`;
  
    db.query(sql, [webinar_id], (err, result) => {
      if (err) {
        console.error('Error incrementing views:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.affectedRows > 0) {
        return res.status(200).json({ message: 'Views incremented successfully' });
      }
      return res.status(404).json({ error: 'Webinar not found' });
    });
  });

// Save webinar to user profile
app.post('/save-webinar/:webinar_id', authenticationToken, checkRole('user'), async (req, res) => {
    const webinar_id = req.params.webinar_id;
    const user_id = req.user.user_id;
    console.log("webinar id : ", webinar_id, "webinar id : ", user_id);
   
    const sql = `INSERT INTO liked_webinars (user_id, webinar_id) VALUES (?, ?)`;
    db.query(sql, [user_id, webinar_id], (err, result) => {
        if (err) {
            console.error(err);
            return response(400, "invalid", false, res);
        }
        if (result?.affectedRows) {
            response(200, result.insertId, true, res)
        }
    });
  });

//nampilin webinar sesuai webinar_id
app.get("/webinar/:webinar_id", (req, res)=> {
    const webinar_id = req.params.webinar_id;
    const sql = `SELECT namaWebinar, Online, img, harga, sertif, deskripsi, lokasi, waktu, cp, host, organisasi_id, views FROM webinar WHERE webinar_id = ${webinar_id} `
    db.query(sql, (err, result)=> {
        if (err) throw err;
        response(200, result, "webinar sesuai id webinar", res)
    })
})

app.get("/webinars-list-penyelenggara/:organisasi_id", (req, res) => {
    const organisasi_id = req.params.organisasi_id;

    const sql = `
        SELECT *
        FROM webinar
        WHERE organisasi_id = ?
        ORDER BY waktu DESC
    `;

    db.query(sql, [organisasi_id], (err, result) => {
        if (err) {
            response(500, "error", "Internal Server Error", res);
        } else {
            response(200, result, "Webinars retrieved successfully", res);
        }
    });
});

app.get("/webinars-list-user/:user_id", (req, res) => {
    const user_id = req.params.user_id;

    const sql = `
        SELECT w.*
        FROM webinar w
        INNER JOIN user_order uo ON w.webinar_id = uo.webinar_id
        WHERE uo.user_id = ?
        ORDER BY w.waktu DESC
    `;

    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                error: err.message, // Include the error message in the response
            });
        } else {
            res.status(200).json({
                status: 'success',
                payload: result,
                message: 'Webinars retrieved successfully',
            });
        }
    });
});

app.get("/penyelenggara", (req, res) => {
    console.log("halo");
    const sql = "SELECT organisasi_id, namaOrganisasi, noTelp, email, website, password, role FROM organisasi"
    db.query(sql, (err, result)=> {
        if (err) throw err;
        return res.status(200).json({ result });
        // response(200, result, "webinars get list", res)
    })
})


app.get("/penyelenggara/:organisasi_id", (req, res) => {
    const organisasi_id = req.params.organisasi_id;
    const sql = `SELECT organisasi_id, namaOrganisasi, noTelp, email, website FROM organisasi WHERE organisasi_id = ?`;
    
    db.query(sql, [organisasi_id], (err, result) => {
        if (err) throw err;
        
        if (result.length > 0) {
            response(200, result[0], "Penyelenggara details retrieved successfully", res);
        } else {
            response(404, null, "Penyelenggara not found", res);
        }
    });
});

// buat registrasi penyelenggara
app.post("/addOrganisasi", async ( req, res) => {
    const { namaOrganisasi, noTelp, email, website, password } = req.body;
    const defaultRole = 'penyelenggara';
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO organisasi (namaOrganisasi, noTelp, email, website, password, role) VALUES ('${namaOrganisasi}', '${noTelp}', '${email}', '${website}', '${hashedPassword}', '${defaultRole}')`

    console.log(req.body)
    db.query(sql, (err, result) => {
        console.log(result);
        if (err) response(400, "invalid", "error", res);
        if (result?.affectedRows) {
            response(200, result.insertId, "Data Added Succesfully", res)
        }
    })
})

//login penyelenggara
app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    db.query('SELECT * FROM organisasi WHERE email = ?', [email], async (err, rows) => {
        if (err) response(400, "invalid", "error", res);

         if (rows.length === 0){
            return response(401, "invalid email", "error", res);
        } 

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return response(402, "invalid password", "error", res);
        }

        const token = jwt.sign({ organisasi_id: user.organisasi_id, role: user.role }, String(process.env.ACCESS_TOKEN_SECRET), {
            expiresIn: 86400 //24h expired
        });
        return res.status(200).json({ token , rows});
    })
})

// protected route Penyelenggara
app.get('/protected', authenticationToken, checkRole('penyelenggara'), (req, res) => {
    const logindata = { organisasi_id: req.user.organisasi_id };
    
    res.status(200).json({ message: 'You have access to this protected route', logindata });
})

function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if(!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (err, user) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ error: 'Forbidden ' + token});
        }
        // return res.status(200).json({ message: 'bisa masuk'});
        req.user = user;
        next();
    })

}

function checkRole(role) {
    return function(req, res, next) {
      if (req.user.role === role) {
        next(); // bisa masuk kalau rolenya sesuai
      } else {
        res.status(403).send('Unauthorized');
      }
    };
  }

// buat nampilin webinar penyelenggara sesuai id organisasinya
app.get("/webinar_penyelenggara/:organisasi_id", (req,res) => {
   const organisasi_id = req.params.organisasi_id;
   const sql = `SELECT webinar_id, namaWebinar, Online, harga, sertif, deskripsi, lokasi, waktu, cp, host, organisasi_id, views FROM webinar WHERE organisasi_id = ${organisasi_id}`
   db.query(sql, (err, result) => {
    if (err) throw err;
    response(200, result, "list", res);
   })
})

// Define the route for adding a webinar
app.post('/addWebinar/:organisasi_id', upload.single('img'), (req, res) => {
    console.log('Incoming request body:', req.body);
    const organisasi_id = req.params.organisasi_id;
    const formData = req.body;

    // Check if req.file is available before accessing its properties
    if (req.file && req.file.buffer) {
        formData.img = req.file.buffer;
    } else {
        console.log("No file");
    }

    const { namaWebinar, Online, harga, sertif, deskripsi, lokasi, waktu, cp, host } = req.body;
    const sql = `INSERT INTO webinar (img, namaWebinar, Online, harga, sertif, deskripsi, lokasi, waktu, cp, host, organisasi_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [formData.img, namaWebinar, Online, harga, sertif, deskripsi, lokasi, waktu, cp, host, organisasi_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return response(400, "invalid", "error", res);
        }
        if (result?.affectedRows) {
            response(200, result.insertId, "Data Added Successfully", res)
        }
    });
});


// registrasi pengguna
app.post("/registerUser", async (req, res) => {
    const { username, email, noTelp, password } = req.body;
    const defaultRolee = 'user';
    const hashedPasswordd = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO user (username, email, noTelp, password, role) VALUES ('${username}', '${email}', '${noTelp}', '${hashedPasswordd}', '${defaultRolee}')`

    // console.log(req.body)
    db.query(sql, (err, result) =>{
        // console.log(result)
        if (err) response(400, "invalid", "error", res);
        if (result?.affectedRows) {
            response(200, result.insertId, "Data Added Succesfully", res)
        }
    })
})

// login pengguna
app.post('/loginUser', async (req, res) => {
    const {email, password} = req.body;

    db.query('SELECT * FROM user WHERE email = ?', [email], async (err, rows) => {
        if (err) response(400, "invalid", "error", res);

         if (rows.length === 0){
            return response(401, "invalid email", "error", res);
        } 

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return response(402, "invalid password", "error", res);
        }

        const token = jwt.sign({ user_id: user.user_id, role: user.role }, String(process.env.ACCESS_TOKEN_SECRET), {
            expiresIn: 86400 //24h expired
        });
        return res.status(200).json({ token , rows});
    })
})

//protected route user
app.get('/profileUser', authenticationToken, checkRole('user'), (req, res) => {
    const loginUserData = { user_id: req.user.user_id };

    res.status(200).json({ message: 'berhasil akses halaman user', loginUserData});
})

// daftar user ke webinar
app.post('/daftarWebinar/:user_id/:webinar_id', (req, res) => {
    const user_id = req.params.user_id;
    const webinar_id = req.params.webinar_id;
    const currentDate = new Date().toISOString().split('T')[0];
    const NamaLengkap = req.body;

    const sql = `INSERT INTO user_order (NamaLengkap, tgl_pesan, user_id, webinar_id) VALUES ('${NamaLengkap}','${currentDate}', '${user_id}', '${webinar_id}')`;
    console.log(req.body);

    db.query(sql, (err, result) => {
        console.log(result);
        if (err) response(400, "invalid", "error", res);
        if (result?.affectedRows) {
            response(200, result.insertId, "Data Added Succesfully", res)
        }
    })
})

// tampilan webinar list menurut like dan user_id
app.get('/webinars-list-user/:user_id', (req, res) => {
    const user_id = req.params.user_id;
  
    const query = `
      SELECT w.*
      FROM user u
      JOIN user_order o ON u.user_id = o.user_id
      JOIN webinar w ON o.webinar_id = w.webinar_id
      WHERE u.user_id = ?
    `;
  
    db.query(query, [user_id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ payload: result, message: 'Webinars retrieved successfully' });
      }
    });
  });

// tampilan user list menurut webinar id atau tampilan order
app.get('/peserta/:webinar_id', (req, res) => {
    const webinar_id = req.params.webinar_id;

    const sql = `SELECT user_order.tgl_pesan, user.email, user.noTelp, webinar.namaWebinar, webinar.harga 
    FROM user_order
    JOIN webinar 
    ON user_order.webinar_id = webinar.webinar_id 
    JOIN user 
    ON user_order.user_id = user.user_id
    WHERE user_order.webinar_id = ${webinar_id}`

    db.query(sql, (err, result)=> {
        if (err) throw err;
        response(200, result, "user get list", res)
    })

}) 

// delete webinar
app.delete("/delwebinar/:webinar_id", (req, res) => {
    const webinar_id = req.params.webinar_id
    const sql = `DELETE FROM webinar WHERE webinar_id = ${webinar_id}`
    db.query(sql, (err, result) => {
        if (err) response(400, "Error", "invalid", res)

        if (result?.affectedRows){
        const data = {
            isDeleted: result.affectedRows
        }
        response(200, data, "Deleted Succesfully", res)
        } else {
            response(400, "Error", "not found", res)
        }
    })
})

// edit webinar
app.put("/editWebinar/:webinar_id/:organisasi_id", async (req, res) => {
    const webinar_id = req.params.webinar_id;
    const organisasi_id = req.params.organisasi_id;
    const { namaWebinar, Online, harga, sertif, deskripsi, lokasi, waktu, cp, host } = req.body
    console.log('Received data:', req.body);
    
    const sql = `UPDATE webinar SET namaWebinar = '${namaWebinar}', Online = '${Online}', harga = '${harga}', sertif = '${sertif}', deskripsi = '${deskripsi}', lokasi = '${lokasi}', waktu = '${waktu}', cp = '${cp}', host = '${host}', organisasi_id = '${organisasi_id}' WHERE webinar_id = '${webinar_id}' `
    
    try {
        const result = await db.query(sql);

        if (result?.affectedRows) {
            const data = {
                isSuccess: result.affectedRows,
                message: result.message,
            };

            // Use the response function to send a successful response
            response(200, data, "Data edit successfully", res);
        } else {
            // Handle the case where no rows were affected
            response(400, "invalid", "gagal", res);
        }
    } catch (error) {
        // Handle database query errors
        console.error('Error updating webinar:', error);

        // Send an error response using the response function
        response(500, "error", "Internal Server Error", res);
    }
})

app.put('/updateWebinar/:webinar_id/:organisasi_id', upload.single('img'), (req, res) => {
    console.log('Incoming request body:', req.body);
    const webinar_id = req.params.webinar_id;
    const organisasi_id = req.params.organisasi_id;
    const formData = req.body;

    // Check if req.file is available before accessing its properties
    if (req.file && req.file.buffer) {
        formData.img = req.file.buffer;
    } else {
        console.log("No file");
    }

    console.log('Received data:', req.body);

    const { namaWebinar, Online, harga, sertif, deskripsi, lokasi, waktu, cp, host } = req.body;
    const sql = `UPDATE webinar SET img=?, namaWebinar=?, Online=?, harga=?, sertif=?, deskripsi=?, lokasi=?, waktu=?, cp=?, host=?, organisasi_id=? WHERE webinar_id=?`;
    const values = [formData.img, namaWebinar, Online, harga, sertif, deskripsi, lokasi, waktu, cp, host, organisasi_id, webinar_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return response(400, "invalid", "error", res);
        }
        if (result?.affectedRows > 0) {
            response(200, webinar_id, "Data Updated Successfully", res);
        } else {
            response(404, webinar_id, "No matching webinar found", res);
        }
    });
});



// tampilan user sesuai user id
// app.get('/user/:user_id', (req, res)=> {
//     const user_id = req.params.user_id;

//     const sql = `SELECT username, email, noTelp FROM user WHERE user_id = ${user_id}`

//     db.query(sql, (err, result)=> {
//         if (err) throw err;
//         response(200, result, "user get list", res)
//     })
// })

app.get("/user/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    const sql = `SELECT username, email, noTelp FROM user WHERE user_id = ?`;

    db.query(sql, [user_id], (err, result) => {
        if (err) throw err;
        
        if (result.length > 0) {
            response(200, result[0], "User details retrieved successfully", res);
        } else {
            response(404, null, "User not found", res);
        }
    });
});

app.put('/user/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const { username, email, noTelp } = req.body;
  
    try {
      // Check if the user exists
      const userExist = await db.query('SELECT * FROM user WHERE user_id = ?', [user_id]);
  
      if (userExist.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Update user data
      await db.query(
        'UPDATE user SET username = ?, email = ?, noTelp = ? WHERE user_id = ?',
        [username, email, noTelp, user_id]
      );
  
      return res.status(200).json({ success: true, message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });


  app.put('/organisasi/:organisasi_id', async (req, res) => {
    const organisasi_id = req.params.organisasi_id;
    const { namaOrganisasi, noTelp, email, website } = req.body;
  
    try {
      // Check if the organisasi exists
      const organisasiExist = await db.query('SELECT * FROM organisasi WHERE organisasi_id = ?', [organisasi_id]);
  
      if (organisasiExist.length === 0) {
        return res.status(404).json({ success: false, message: 'Organisasi not found' });
      }
  
      // Update organisasi data
      await db.query(
        'UPDATE organisasi SET namaOrganisasi = ?, noTelp = ?, email = ?, website = ? WHERE organisasi_id = ?',
        [namaOrganisasi, noTelp, email, website, organisasi_id]
      );
  
      return res.status(200).json({ success: true, message: 'Organisasi updated successfully' });
    } catch (error) {
      console.error('Error updating organisasi:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  app.post('/like-webinar/:user_id/:webinar_id', async (req, res) => {
    try {
      const { user_id, webinar_id } = req.params;
  
      // Lakukan operasi untuk menambahkan webinar_id ke dalam daftar liked_webinars pada user_id tertentu
      // Misalnya, kita simpan di dalam basis data
      // Gantilah operasi ini dengan operasi yang sesuai dengan server atau basis data yang kamu gunakan
      // Contoh menggunakan MySQL
      const result = await db.query('INSERT INTO liked_webinars (user_id, webinar_id) VALUES (?, ?)', [user_id, webinar_id]);
  
      res.status(200).json({
        status: 'success',
        message: 'Webinar has been liked successfully',
      });
    } catch (error) {
      console.error('Error liking webinar:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  });
  
  // Mendefinisikan endpoint untuk menghapus webinar dari daftar yang disukai
    app.delete('/unlike-webinar/:user_id/:webinar_id', async (req, res) => {
    try {
      const { user_id, webinar_id } = req.params;
  
      // Lakukan operasi untuk menghapus webinar_id dari daftar liked_webinars pada user_id tertentu
      // Misalnya, kita simpan di dalam basis data
      // Gantilah operasi ini dengan operasi yang sesuai dengan server atau basis data yang kamu gunakan
      // Contoh menggunakan MySQL
      const result = await db.query('DELETE FROM liked_webinars WHERE user_id = ? AND webinar_id = ?', [user_id, webinar_id]);
  
      res.status(200).json({
        status: 'success',
        message: 'Webinar has been unliked successfully',
      });
    } catch (error) {
      console.error('Error unliking webinar:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  });
  
  
  // Updated endpoint to fetch liked webinars based on user_id and webinar_id
    app.get("/liked-webinars/:user_id", (req, res) => {
        const user_id = req.params.user_id;
        const webinar_id = req.params.webinar_id;

        const sql = `
            SELECT w.*
            FROM webinar w
            INNER JOIN liked_webinars lw ON w.webinar_id = lw.webinar_id
            WHERE lw.user_id = ? 
            ORDER BY w.waktu DESC
        `;

        db.query(sql, [user_id], (err, result) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).json({
                    status: 'error',
                    message: 'Internal Server Error',
                    error: err.message,
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    payload: result,
                    message: 'Liked Webinars retrieved successfully',
                });
            }
        });
    });

  