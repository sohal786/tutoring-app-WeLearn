// Contents of the About page

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
      <div className="content">
        <div className="hero">
          <div className="featureContent">
            <h1>Help. When you need it, Where you want it.</h1>
            <h2>
              Welcome to San Francisco State's tutoring management platform.
            </h2>
            <br></br>
            <div className="button-row">
              <Link to="/about">
                <Button variant="primary">
                  <h3>Login</h3>
                </Button>
              </Link>

              <Link to="/about">
                <Button variant="secondary">
                  <h3>Sign Up</h3>
                </Button>
              </Link>
            </div>

            <br></br>
            <br></br>
            <Link to="/about">
              <Button>Learn More</Button>
            </Link>
          </div>
        </div>

        <div className="feature-background section1">
          <div className="featureContent">
            <h1>One on One Turoring Services.</h1>
            <p>
              Our one-on-one tutoring program is designed to provide you with
              personalized support tailored to your unique needs. Whether you're
              struggling with a specific subject, want to deepen your
              understanding, or simply need a confidence boost, our experienced
              tutors are here to help you every step of the way. Join us on your
              journey to success!
            </p>
          </div>
        </div>

        <div className="feature-background section2">
          <div className="featureContent">
            <h1>Broad Subjects, Knowledgeable People</h1>
            <p>
              We understand that students have diverse academic interests and
              needs. That's why we offer a wide range of subjects, from
              mathematics and science to humanities and social sciences. Our
              team of expert tutors spans various disciplines, ensuring that you
              have access to the best guidance and assistance for your chosen
              field of study. Whether you're pursuing a degree in STEM, arts, or
              any other discipline, we have you covered.
            </p>
          </div>
        </div>

        <div className="feature-background section2">
          <div className="featureContent">
            <h1>On-Demand Support </h1>
            <p>
              College life can be challenging, and we're here to make it easier.
              Our on-demand tutoring service ensures that help is always just a
              click away. Whether you're facing a last-minute assignment,
              preparing for a crucial exam, or simply seeking clarification on a
              challenging concept, our tutors are available to provide immediate
              support. We understand the importance of timely assistance, and
              we're committed to helping you succeed, no matter when you need
              it.
            </p>
          </div>
        </div>

        <div className="feature-background section2">
          <div className="featureContent">
            <h1>Join as a tutor</h1>
            <p>
              Are you a passionate and knowledgeable student looking to make a
              meaningful impact on your fellow classmates? Consider becoming a
              tutor with us! Our tutoring platform not only provides valuable
              support to students but also fosters a strong sense of community.
              As a tutor, you'll have the opportunity to share your expertise,
              inspire others, and contribute to the academic growth of your
              peers. Join our team of dedicated tutors and help shape the future
              of education.
            </p>
          </div>
        </div>

        <div className="feature-background section2">
          <div className="featureContent">
            <h1>Comprehensive Support</h1>
            <p>
              We're more than just tutors; we're your partners in success. We
              provide comprehensive support that extends beyond subject-specific
              assistance. Our platform offers resources, study tips, and
              guidance on effective learning strategies to help you navigate the
              challenges of college life. Whether you need help with time
              management, study skills, or career planning, we're here to
              support your holistic development.
            </p>
          </div>
        </div>

        <div className="feature-background section2">
          <div className="featureContent">
            <h1>
              Experience the Difference: Student-Centered Tutoring Services
            </h1>
            <p>
              What sets us apart is our unwavering commitment to putting
              students first. Our student-centered approach means that your
              success and well-being are our top priorities. We understand the
              pressures of college life, and we're here to alleviate them. With
              our dedicated tutors, diverse subject offerings, and a supportive
              community, you'll experience the difference of a truly
              student-focused tutoring service.
            </p>
          </div>
        </div>

        <div className="feature-background section2">
          <div className="featureContent">
            <h1>Start Your Journey to Academic Excellence Today!</h1>
            <p>
              Ready to embark on a journey toward academic excellence? It all
              begins here. Join our college tutoring services platform and
              discover the benefits of personalized one-on-one tutoring, a wide
              range of subjects, on-demand support, and a thriving student
              community. Whether you're a student seeking help or a potential
              tutor looking to make a difference, our platform is your gateway
              to success. Take the first step toward achieving your academic
              goals today!
            </p>
          </div>
        </div>
      </div>
    );
}
 
export default HomePage;