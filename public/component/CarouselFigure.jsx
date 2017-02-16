import React from 'react';
import ShiciPic from '../images/CarouselFigure/shicizhimei.jpg';
import RuanjianPic from '../images/CarouselFigure/ruanjiangongcheng.jpg';
import JavaPic from '../images/CarouselFigure/java.png';
import GaojichengxuPic from '../images/CarouselFigure/gaojichengxusheji.png';
import DianluPic from '../images/CarouselFigure/dianlulilun.jpg';

require("../css/CarouselFigure.css");

class CarouselFigure extends React.Component {
    render() {
        return (
            <div className="lunbotu">
            <div id="myCarousel" className="carousel slide">
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                    <li data-target="#myCarousel" data-slide-to="3"></li>
                    <li data-target="#myCarousel" data-slide-to="4"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="item active">
                        <img src={ShiciPic} alt="First slide"/>
                        <div className="container">
                            <div className="carousel-caption">
                                <h2>古代诗词之美</h2>
                                <p>本课程能够带领你畅游古代的诗词世界,给你一个全新的感受</p>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img src={RuanjianPic} alt="Second slide"/>
                        <div className="carousel-caption">
                            <h2>软件工程</h2>
                            <p>软件工程让你探索从未知到实现的整个过程,让你领略架构的魅力</p>
                        </div>
                    </div>
                    <div className="item">
                        <img src={JavaPic} alt="Third slide"/>
                        <div className="carousel-caption">
                            <h2>JAVA</h2>
                            <p>让你进入一个跨平台的语言世界,能够灵活掌握java</p>
                        </div>
                    </div>
                    <div className="item">
                        <img src={GaojichengxuPic} alt="Four slide"/>
                        <div className="carousel-caption">
                            <h2>高级程序设计</h2>
                            <p>本书以c语言为载体，引进PAD表示程序逻辑，阐述基本的程序设计方法。</p>
                        </div>
                    </div>
                    <div className="item">
                        <img src={DianluPic} alt="Five slide"/>
                        <div className="carousel-caption">
                            <h2>电路基础</h2>
                            <p>从实际电路出发,理论与实践相结合,让你掌握电路基础</p>
                        </div>
                    </div>
                </div>
                <a className="carousel-control left" href="#myCarousel"
                   data-slide="prev">&lsaquo;</a>
                <a className="carousel-control right" href="#myCarousel"
                   data-slide="next">&rsaquo;</a>
            </div>
            </div>
    )
    }
    }
    export default CarouselFigure;
