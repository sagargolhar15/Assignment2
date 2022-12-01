const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', './views');

// home page route
app.get('/', (req, res) => {
    data = {
        heading1: "We're Building For Billions And Crafting Stories Of Bold Transformation",
        heading2: 'The next-gen global technology company helping businesses to grow and thrive in the digital age',
        link: 'Subscribe'
    }
    res.render('home', { data: data });
})

// about page route
app.get('/about', (req, res) => {
    data = {
        heading1: "ABOUT US",
        heading1_desc: 'Etiam at varius tellus. Proin vitae dui dolor. Praesent blandit vitae arcu in congue. Nulla rhoncus nisl et dolor eleifend',
        heading2: "About NeoSOFT Technology",
        heading2_desc: 'Engineering ideas to improvise lives, NeoSOFT over the past 25 years, has empowered ambitious change-makers around the world with sustained digital capabilities. We are a trusted Digital Engineering and Enterprise Modernization partner with offerings that enable our clients’ by creating a unique competitive advantage. While leaving room for continuous enhancement, NeoSOFT has leveraged the most in-demand technologies, methodologies, and framework components, for solving important client challenges. Combining deep technical competencies and industry experience, we ensure robustness, extensibility, and continuity in the solutions we deliver.',
        img: 'about.jpg'

    }
    res.render('about', { data: data });
})

// gallery page route
app.get('/gallery', (req, res) => {
    data = [{
        img: 'cloud.jpg',
        name: 'Cloud Computing',
        desc: 'Leveraging The Cloud To Deploy A Winning Enterprise IT Strategy'
    },
    {
        img: 'banking.jpg',
        name: 'Open Banking',
        desc: 'Open Banking: Carving New Pathways Through Digital Transformation'
    },
    {
        img: 'data.jpg',
        name: 'Data',
        desc: 'Getting Future-Ready.The Data-Driven Enterprises Of 2025'
    }]
    res.render('gallery', { data: data });
})


// services page route
app.get('/services', (req, res) => {
    data = [{
        icon: 'fa fa-lock',
        name: 'Custom Software Development',
        desc: 'Large organizations frequently develop custom software to fill in the gaps of their existing commercial off-the-shelf (COTS) solutions. These most often include applications for content management, customer management, human resource management and inventory management.'
    },
    {
        icon: 'fa fa-bars',
        name: 'Web Application Development',
        desc: 'Web application development is an extension of standard software development with distinctive characteristics such as an increased need for an iterative development process. Security is also a'
    },
    {
        icon: 'fa fa-heart',
        name: 'Mobile Application Development',
        desc: 'Mobile application development is an extension of standard software development with distinctive characteristics such as an increased need for an iterative development process. Security is also a'
    }]
    res.render('services', { data: data });
})

// contact page route
app.get('/contact', (req, res) => {
    res.render('contact');
})

// contact page data save into file
app.post('/save_contact', (req, res) => {
    fullname = req.body.fullname;
    city = req.body.city;
    email = req.body.email;
    subject = req.body.subject;

    var data = fullname + "," + email + "," + city + "," + subject + "\n";
    if (fullname != "" && email != "" && city != "" && subject != "") {
        fs.appendFile('./public/contact.txt', data, (err) => {
            if (err) throw err
        })
        res.send(`<script>
        alert('Information submited successfully'); 
        window.location.assign('/contact')
    </script>`);
    }
    else {
        res.send(`<script>
        alert('Fill All Details'); 
        window.location.assign('/contact')
    </script>`);
    }
})
// show contact details
app.get('/show_contact', (req, res) => {
    try {
        // read contents of the file
        const data = fs.readFileSync('./public/contact.txt', 'UTF-8')
      
        // split the contents by new line
        const lines = data.split(/\r?\n/)
      var arr=[]
        // print all lines
        
        lines.forEach(line => {
            const li=line.split(/,/)
             arr.push(`{"name":"${li[0]}","email":"${li[1]}", "city":"${li[2]}","subject":"${li[3]}"}`);
        })
        var result = arr.map(info => JSON.parse(info));
        res.render("show_contact",{result:result})
      } catch (err) {
        console.error(err)
      }
})  

app.listen(PORT, (err) => {
    if (err) throw err;
    else console.log(`the server run on the ${PORT}`)
})
