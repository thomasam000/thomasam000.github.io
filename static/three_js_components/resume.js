var element = document.createElement( 'div' );
element.className = 'container';
// element.style['max-width'] = '1000px'
// element.style['width'] = '90%'

// var row = document.createElement( 'div' );
// row.className = 'row';

// var col = document.createElement( 'div' );
// col.className = 'row';
// col.html = <a href="images/resume.jpg" download id="download">Download My Resume</a>
// row.appendChild( col );

// var col = document.createElement( 'div' );
// col.className = 'row';
// col.style['max-width'] = '1000px'
// var h1 = document.createElement( 'h1' );
// h1.html = 'Sam Thomas'
// var h3 = document.createElement( 'div' );
// h3.html = 'Full Stack Developer'
// var p = document.createElement( 'div' );
// p.html = 'Bilingual (Spanish)'
// col.appendChild(h1)
// col.appendChild(h3)
// col.appendChild(p)
// row.appendChild( col );
// element.appendChild(row)


const resumeObject = new THREE.CSS3DObject( element );
// objectCSS.position.x = Math.random() * 4000 - 2000;
// objectCSS.position.y = Math.random() * 4000 - 2000;
// objectCSS.position.z = Math.random() * 4000 - 2000;

// export default resumeObject
export default resumeObject



/* <div class="container" style="max-width:1000px; width:90%;">
    <div class="row">
        <div class="col-12">
            <a href="images/resume.jpg" download id="download">Download My Resume</a>
        </div>
    <br><br>
    <div class="col-12 " style="text-align:left;">
        <h1>Sam Thomas</h1>
        <h3>Full Stack Developer</h3>
        <p>Bilingual (Spanish)</p>
    </div>
    <div class="col-12 " style="text-align:left;">
    </br><b>Info</b></br>
        <span>Queens, New York</span></br>
        <span>(509) 670-8432</span></br>
        <span>thomasam000@gmail.com</span>
        <br><br>
    </div>
    <br>
    <div class="col-12" style="text-align:left;">
        <b>SUMMARY</b>
        <p>Software Developer and passionate creator with experience in creating full stack applications using Java, the Spring Framework, MySQL databases, MVC architecture, JavaScript. Python and. Seeking a position as an entry level Back-End Developer and ready to start my future career as a Software Developer.</p>
    </div>
    <div class="col-12" style="text-align:left;">
        <br><br>
        <h4>Links</h4>
        <hr>
        <i class="fa fa-linkedin"></i><a href="http://linkedin.com/in/sam-thomas-286826181/">linkedin.com/in/sam-thomas-286826181/</a><br>
        <i class="fa fa-github"></i><a href="http://github.com/thomasam000">github.com/thomasam000</a><br>
        <i class="fa fa-globe"></i><a href="http://samthomasdev.com">samthomasdev.com</a>
    </div>
    <div class="col-12" style="text-align:left;">

        <br><br>
        <h4>Experience</h4>
        <hr>
        <p>SOFTWARE DEVELOPER - BotFactory <br>Feb 2020 - Present</p>
        <ul>
        <li>Created a new implementation of the User interface using the Vue Framework and ThreeJS.   </li>
        <li>Contributed in redesigning a python software architecture and migrating the codebase from python 2 to 3.</li>
        <li>Fixed bugs, added features and wrote tests for the software of PCB printers.</li>
        </ul>
        <p>ODOO DEVELOPER/INTERN - BotFactory <br>Feb 2020 - Aug 2020</p>
        <ul>
        <li>Created a blog and web page versioning tool, to keep track and restore previous iterations of web pages and blog posts.</li>
        <li>Improved customer support and sales experience by implementing email automation, and email tracking with webhooks.</li>
        <li>Took a major role in Managing the ERP, CMS, and CRM of the company.</li>
        <li>Created web pages such as a customer support form to create support tickets and validate serial numbers with the server.</li>
        </ul>
        <p>SOFTWARE TUTOR - Self-Employed <br>October 2019 - July 2020</p>
        <ul>
        <li>Taught Beginner-intermediate Piano Lessons and managed the curriculum, finances and the lesson schedule for up to 15 students at a time, ranging from young children to adults, in both English and Spanish. </li>
        <li>Soft skills used: Teaching skills, self-motivation, advertising, organization, finances, and time management.</li>
        </ul>
        <p>PIANO INSTRUCTOR - Self-Employed <br>May 2018 - July 2020</p>
        <ul>
        <li>Taught Beginner-intermediate Piano Lessons and managed the curriculum, finances and the lesson schedule for up to 15 students at a time, ranging from young children to adults, in both English and Spanish. </li>
        <li>Soft skills used: Teaching skills, self-motivation, advertising, organization, finances, and time management.</li>
        </ul>
        <p>HOST - Wapato Point Cellars <br>June 2015 - December 2018</p>
        <ul>
        <li>Worked as a host in often high stress situations, coordinating work between the bussers, srevers and kitchen staff in order for the restaurant to run smoothly each night and keep the customers satisfied.</li>
        <li>Soft skills used: verbal-communication, working in high-stress environments, attention to detail and time management.</li>
        </ul>

        <!-- <br><br>
        <h4>Projects</h4>
        <hr> -->
        <!-- <p>TOP DOG REMODELING - <a href="http://serene-lake-79956.herokuapp.com">in progress</a></p>
        <ul>
        <li>Created a multipage dynamic website using Spring Boot MVC. The site allowed admin to sign in and upload photos using the dropbox API and content using a MYSQL database.</li>
        <li>Technologies Used: Java, Thyme Leaf, MySQL, JavaScript, Drop Box API, HTML, CSS, Bootstrap, Spring MVC, Heroku, Tomcat and Spring Dependency Injection.</li>
        </ul> -->
        <!-- <p>MUSIC REVIEW WEBSITE - <a href="http://calm-cove-00851.herokuapp.com">calm-cove-00851.herokuapp.com</a></p>
        <ul>
        <li>Created a multipage dynamic website using Spring Boot MVC. The site allowed users to sign in as either a contributor that could write reviews, an admin who could manage all users and content or a user who can display content and create comments.</li>
        <li>Technologies Used: Java, Thyme Leaf, MySQL, JavaScript, LastFM API, TinyMCE, HTML, CSS, Bootstrap, Spring MVC, Heroku, Tomcat and Spring Dependency Injection.</li>
        </ul>
        <p>VENDING MACHINE REST API
        <ul>
        <li>Built a vending machine API using Java Spring Boot with an interactive front end using JQuery and Ajax.</li>
        <li>Technologies Used: Java, JavaScript, REST API, jQuery, Ajax, HTML, CSS, Spring Boot, and Spring Dependency Injection.</li>
        </ul> -->
    </div>
    <div class="col-12">
        <br><br>
        <div style="text-align:left;"><h4>Skills</h4></div>
        <hr>
        <div class="container">
        <div class="row">
            <div class="col-6 col-md-4 skill">Restful Web Services (Micro-Services) using Spring Framework<br>● ● ● ● ●<br></div>
            <div class="col-6 col-md-4 skill">Web App Development with Spring Web MVC, Spring JDBC<br>● ● ● ● ●<br></div>
            <div class="col-6 col-md-4 skill">HTML, CSS, JavaScript, jQuery and Bootstrap with Responsive Design<br>● ● ● ● ⚬<br></div>
            <div class="col-6 col-md-4 skill">Test-driven Development<br>● ● ● ● ⚬<br></div>
            <div class="col-6 col-md-4 skill">Version Control System (GitHub)<br>● ● ● ● ⚬<br></div>
            <div class="col-6 col-md-4 skill">Data Structures<br>● ● ● ⚬ ⚬ <br></div>
        </div>
        </div>
    </div>
    <div class="col-12" style="text-align:left;">

    </div>
    <div class="col-12">
        <br><br>
        <div style="text-align:left;"><h4>Skills</h4></div>
        <hr>
        <div class="container">
        <div class="row">
            <div class="col-6 col-md-3 skill">Java<br>● ● ● ● ●</div>
            <div class="col-6 col-md-3 skill">MySQL<br>● ● ● ● ●<br></div>
            <div class="col-6 col-md-3 skill">JavaScript<br>● ● ● ● ⚬<br></div>
            <div class="col-6 col-md-3 skill">HTML/CSS<br>● ● ● ● ⚬<br></div>
        </div>
        </div>
    </div>
    <div class="col-12" style="text-align:left;">
        <br><br>
        <h4>Education</h4>
        <hr>
        <p>Vue School - Vue.js certification<br>Feb 2022</p>
        <br>
        <p>THE SOFTWARE GUILD - Full Stack Java Boot Camp<br>March 2019 – November 2019</p>
        <br>
        <p>College Credits: 46<br>BRIGHAM YOUNG UNIVERSITY– GPA 3.94<br>January 2018 – May 2018</p>
    </div>

    </div>
</div> */