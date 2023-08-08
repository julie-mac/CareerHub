import React from "react";
import NavBar from "../layouts/Navbar";
import Image1 from "../images/Technology_img.png"
import Image2 from "../images/Science_img.jpg"
import Image3 from "../images/Law_img.jpg"
import Image4 from "../images/Economics_img.jpg"
import Image5 from "../images/Art_img.jpg"
import Image6 from "../images/Education_img.jpg"
import Image7 from "../images/Health_img.jpg"
import Image8 from "../images/Medicine_img.jpg"
import Image9 from "../images/Culinary_Arts_img.jpg"
import Image10 from "../images/Fashion_img.jpg"
import Image11 from "../images/Finance_img.jpg"
import Image12 from "../images/Automotive_img.jpg"
import Image13 from "../images/Travel_img.jpeg"
import Image14 from "../images/Government_img.jpg"






const TopicsMain = () => {       

    return (
    <div>
        <NavBar />
        <h2>TOPICS</h2>
        <div class="row">
    
            <div class="image">
                <img src={Image1} alt=""/>
                <div class="details">
                    <h2> <a href="/Topics_Title/Technology"><span>TECHNOLOGY</span></a></h2>  
                </div>
            </div>
    
            <div class="image">
                <img src={Image2} alt=""/> 
                <div class="details">
                    <h2> <a href="/Topics_Title/Science"><span>SCIENCE</span></a></h2>   
                </div>.
            </div>         
        </div> 
        
        <div class="row">
    
            <div class="image">
                <img src={Image3} alt=""/>
                <div class="details">
                    <h2> <a href="/Topics_Title/Law"><span>LAW</span></a></h2>  
                </div>
            </div>

            <div class="image">
                <img src={Image4} alt=""/> 
                <div class="details">
                    <h2> <a href="/Topics_Title/Economics"><span>Economics</span></a></h2>   
                </div>.
            </div>
    
        </div>

        <div class="row">
    
            <div class="image">
                <img src={Image5} alt=""/>
                <div class="details">
                    <h2> <a href="/Topics_Title/Art"><span>Art</span></a></h2>  
                </div>
            </div>

            <div class="image">
                <img src={Image6} alt=""/> 
                <div class="details">
                    <h2> <a href="/Topics_Title/Education"><span>Education</span></a></h2>   
                </div>.
            </div>
    
        </div>

        <div class="row">
    
            <div class="image">
                <img src={Image7} alt=""/>
                <div class="details">
                    <h2> <a href="/Topics_Title/Health"><span>Health</span></a></h2>  
                </div>
            </div>

            <div class="image">
                <img src={Image8} alt=""/> 
                <div class="details">
                    <h2> <a href="/Topics_Title/Medicine"><span>Medicine</span></a></h2>   
                </div>.
            </div>
        </div>
        
        <div class="row">
    
            <div class="image">
                <img src={Image9} alt=""/>
                <div class="details">
                    <h2> <a href="/Topics_Title/Culinary_Arts"><span>Culinary Arts</span></a></h2>  
                </div>
            </div>

            <div class="image">
                <img src={Image10} alt=""/> 
                <div class="details">
                    <h2> <a href="/Topics_Title/Fashion"><span>Fashion</span></a></h2>   
                </div>.
            </div>    
        </div>

        <div class="row">
    
            <div class="image">
                <img src={Image11} alt=""/>
                <div class="details">
                    <h2> <a href="/Topics_Title/Finance"><span>Finance</span></a></h2>  
                </div>
            </div>

            <div class="image">
                <img src={Image12} alt=""/> 
                <div class="details">
                    <h2> <a href="/Topics_Title/Automotive"><span>Automotive</span></a></h2>   
                </div>.
            </div>    
        </div> 

        <div class="row">
    
            <div class="image">
                <img src={Image13} alt=""/>
                <div class="details">
                    <h2> <a href="/Topics_Title/Travel"><span>Travel</span></a></h2>  
                </div>
            </div>

            <div class="image">
                <img src={Image14} alt=""/> 
                <div class="details">
                    <h2> <a href="/Topics_Title/Government"><span>Government</span></a></h2>   
                </div>.
            </div>    
        </div> 
            
              
    </div>
        );
    };
        
export default TopicsMain;










