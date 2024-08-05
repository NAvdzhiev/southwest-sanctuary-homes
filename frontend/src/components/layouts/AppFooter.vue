<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-column">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Real Estate</a></li>
              <li><a href="#">Design & Renovation</a></li>
              <li><a href="#">Our Mission</a></li>
              <li><a href="#">Our Team</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Useful Links</h4>
            <ul>
              <li><a href="#">Client Reviews</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Customer Care</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Accessibility Statement</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Headqarters</h4>
            <address>
              <p>123 Mirage Blvd</p>
              <p>Suite 500</p>
              <p>Las Vegas, NV 89109</p>
            </address>
            <h4>Office - CA</h4>
            <address>
              <p>456 Citrus Ave</p>
              <p>Suite 210</p>
              <p>Riverside, CA 92501</p>
            </address>
          </div>
          <div class="footer-column">
            <h4>Office - AZ</h4>
            <address>
              <p>789 Pinecone Rd</p>
              <p>Suite 300</p>
              <p>Flagstaff, AZ 86001</p>
            </address>
            <h4>Office - NM</h4>
            <address>
              <p>101 Mesa St</p>
              <p>Suite 400</p>
              <p>Albuquerque, NM 87102</p>
            </address>
          </div>
          <div class="footer-column">
            <h4>Social Links</h4>
            <div class="social-links">
              <a href="#">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-pinterest-p"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-youtube"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-x-twitter"></i>
              </a>
              
            </div>
            <div class="copywright">
                <p>&copy; 2024 Southwest Sanctuary Homes</p>
                <p>Site by Nedyalko Avdzhiev</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <style scoped>
  .footer {
    background-color: var(--footer-color);
    color: #fff;
    padding: 50px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .footer h4 {
    color: var(--accent-color);
    font-size: 24px;
    text-transform: uppercase;
  }
  
  .container {
    max-width: 100%;
    margin: 0 auto;
    padding: 0 48px;
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px;
  }
  
  .footer-column {
    display: flex;
    flex-direction: column;
  }
  
  .footer-column h4 {
    margin-bottom: 10px;
  }
  
  .footer-column ul {
    list-style-type: none;
    padding: 0;
  }
  
  .footer-column ul li {
    margin-bottom: 10px;
  }
  
  .footer-column ul li a {
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
  }
  
  .footer-column ul li a:hover {
    text-decoration: underline;
  }
  
  .footer-column address > p {
    font-style: normal;
    margin: 0;
    line-height: 20px;
    font-size: 14px;
  }

  .social-links {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }
  
  .social-links i {
    font-size: 24px;
    color: var(--container-color);
  }

  div.copywright {
    margin-top: 20px;
  }

  div.copywright > p {
    width: 100%;
    color: var(--container-color);
    font-size: 11px;
    margin: 0;
  }
  </style>
  