import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import React from "react";
import Application from "../sections/Application/Application";
import Section from "../components/Section/Section";
import WelcomeImage from "../assets/img/welcome-img.png";
import WelcomeImageMobile from "../assets/img/welcome-img.png";
import Fade from "react-reveal/Fade"
import "../sections/Welcome/Welcome.scss";

const ApplicationPageWelcome = () => {
    return (
        <Section container welcome placeholder id="welcome" className="small">
            <div className="row" style={{position: "relative"}}>
                <div className="col-md-7 col-12">
                    <Fade left delay={350}>
                        <img
                            src={WelcomeImageMobile}
                            alt="IOK 2023"
                            className="welcome-image-mobile"
                        />
                    </Fade>
                    <Fade top delay={400}>
                        <>
                            <div className="title title1"></div>
                            <div className="title title2">NetAcad Oktatásért díjak</div>
                            <div className="title title3">2024</div>
                        </>
                    </Fade>
                </div>
            </div>
            <Fade right duration={1300}>
                <img src={WelcomeImage} alt="" className="welcome-image" />
            </Fade>
        </Section>
    );
};

export const ApplicationPage = () => (
    <>
        <Header noButtons/>
        <main>
            <ApplicationPageWelcome />
            <Application />
        </main>
        <Footer/>
    </>
)