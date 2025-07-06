import { useNavigate } from "react-router-dom";

//ICONS
import pawIcon from "../assets/images/icons/paw.png";
import gCashIcon from "../assets/images/icons/gcash.png"
import payPalIcon from "../assets/images/icons/paypal.png"

//QR CODES
import gCashQR from "../assets/images/qr-codes/qr-gcash.jpg"
import payPalQR from "../assets/images/qr-codes/qr-paypal.png"

//DEVS PHOTOS
import alexanderPhoto from "../assets/images/devs/alexander.jpg"
import romanPhoto from "../assets/images/devs/roman.jpg"
import noelPhoto from "../assets/images/devs/noel.jpg"
import rodgiePhoto from "../assets/images/devs/rodgie.jpg"

//LOGO
import logo from "../assets/images/logo/logo.png"

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-300 to-gray-100 lg:p-10 bg-fixed flex justify-center text-sm">
            <div className="relative lg:w-[90%] max-w-300 lg:flex justify-between">
                <div onClick={() => navigate(-1)} className="absolute top-2 left-3 rounded-full text-[#4B7FBB] p-3 hover:underline active:underline ease-in-out duration-300 cursor-pointer z-1">
                    Go back
                </div>
                <div className="relative bg-white lg:w-[60%] lg:rounded-l-lg lg:py-12 lg:px-15 px-5 pb-10 pt-13 text-gray-600">
                    <img src={logo} alt="paw-pals" className="absolute top-7 right-7 w-20" />
                    <div className="text-4xl lg:flex lg:flex-row flex-col gap-3 pb-10">
                        <p className="lg:mt-auto">About</p>
                        <div className="flex gap-1">
                            <h1 className="outfit text-5xl font-bold my-auto"><span className="text-[#3B6FA1]">Paw</span><span className="text-gray-700">Pals</span></h1>
                            <img src={pawIcon} alt="paw" className="w-9 h-9 my-auto" />
                        </div>
                    </div>
                    <div className="lg:px-10 px-5">
                        <p className="pb-5">Ideated by developers Roman, Alexander, Noel and Rodgie PawPals was designed with the goal of uniting families with their dream pets in one single consolidated space.</p>
                        <p className="pb-5">Our initial plan was to partner with local governments and their city pounds (LGU City Pounds) to help find new homes for stray pets and help return lost ones.</p>
                        <p className="pb-5">This plan then developed into wanting to include trusted ethical private breeders and kennels in our system. In order to maintain the trust of those who use our website, we manually verify kennels who wish to join and remove and reject those who are not up to code legally and socially.</p>
                        <p className="pb-5">Every pet we feature has a story — and your support helps us keep those stories going.</p>
                        <p className="pb-5">If you believe in what we do and want to help us grow, consider making a small donation. Your contribution goes a long way in supporting our development, hosting costs, and outreach efforts.</p>
                        <p className="pb-5">Donate via:</p>
                        <div className="flex justify-center lg:gap-10 gap-5 pb-5">
                            <div>
                                <div className="flex gap-1 justify-center pb-2">
                                    <img src={payPalIcon} alt="paypal icon" className="h-5" />
                                    <p className="my-auto font-bold">PayPal</p>
                                </div>
                                <p className="text-[#4B7FBB] text-xs font-bold text-center pb-1">QR Code:</p>
                                <div className="p-2 border-1 border-[#4B7FBB] rounded-md lg:w-30 w-25 lg:h-30 h-25">
                                    <img src={payPalQR} alt="paypal qr h-[100%] w-[100%]" />
                                </div>
                                <p className="text-[#4B7FBB] text-xs font-bold text-center pb-1 pt-3">Link:</p>
                                <form action="https://www.paypal.com/donate" method="post" target="_top" className="w-[74px] h-[21px] mx-auto">
                                    <input type="hidden" name="business" value="KRCK36QUP5YFC" />
                                    <input type="hidden" name="no_recurring" value="0" />
                                    <input type="hidden" name="item_name" value=" Help us keep PawPals running through your generous donations. Thank you for whatever support you can give!" />
                                    <input type="hidden" name="currency_code" value="PHP" />
                                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                                    <img alt="" border="0" src="https://www.paypal.com/en_PH/i/scr/pixel.gif" width="1" height="1" />
                                </form>
                            </div>
                            <div className="bg-[#4b7fbb78] lg:h-52 h-47 my-auto w-[2px] rounded-full"></div>
                            <div>
                                <div className="flex gap-1 justify-center pb-2">
                                    <img src={gCashIcon} alt="g-cash icon" className="h-5" />
                                    <p className="my-auto font-bold">GCash</p>
                                </div>
                                <p className="text-[#4B7FBB] text-xs font-bold text-center pb-1">QR Code:</p>
                                <div className="p-2 border-1 border-[#4B7FBB] rounded-md lg:w-30 w-25 lg:h-30 h-25">
                                    <img src={gCashQR} alt="paypal qr h-[100%] w-[100%]" />
                                </div>
                            </div>
                        </div>

                        <p>Every donation, big or small, is deeply appreciated.</p>
                        <p>Thank you for being part of our journey!</p>
                    </div>
                </div>
                <div className="bg-[#4B7FBB] lg:w-[40%] lg:rounded-r-lg lg:py-12 lg:px-15 py-8 px-5 text-white">
                    <p className="text-5xl text-right sriracha pb-10">About Us</p>
                    <div className="px-5 pb-10">
                        <p className="pb-5">We're a small team of passionate developers who built this project with heart. What started as a coding challenge became a mission — to create something meaningful, helpful, and community-driven.</p>
                        <p className="pb-5">We love building things that make a difference, and this app is just one step in our journey. Thanks for checking us out and supporting our work!</p>
                    </div>
                    <div className="flex justify-center gap-3 pb-8">
                        <div className="bg-white h-[2px] w-17 rounded-full my-auto"></div>
                        <p className="text-center font-bold text-lg">Meet the Team</p>
                        <div className="bg-white h-[2px] w-17 rounded-full my-auto"></div>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <div className="text-center mx-5 mb-5">
                            <div className="rounded-full overflow-hidden">
                                <img src={romanPhoto} alt="roman" className="w-30 border-5 border-[#3b6493] rounded-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={() => window.open('https://www.linkedin.com/in/romgavino/', '_blank')} />
                            </div>
                            <p className="font-semibold pt-1">Roman Gavino</p>
                            <p className="text-xs text-gray-300">Backend Developer</p>
                        </div>
                        <div className="text-center mx-5 mb-5">
                            <div className="rounded-full overflow-hidden">
                                <img src={alexanderPhoto} alt="alexander" className="w-30 border-5 border-[#3b6493] rounded-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={() => window.open('https://www.linkedin.com/in/noelalexader/', '_blank')} />
                            </div>
                            <p className="font-semibold pt-1">Alexander Noel</p>
                            <p className="text-xs text-gray-300">Frontend Developer</p>
                        </div>
                        <div className="text-center mx-5 mb-5">
                            <div className="rounded-full overflow-hidden">
                                <img src={noelPhoto} alt="noel" className="w-30 border-5 border-[#3b6493] rounded-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={() => window.open('https://www.linkedin.com/in/noel-john-hementera-b2a11312b/', '_blank')} />
                            </div>
                            <p className="font-semibold pt-1">Noel Hementera</p>
                            <p className="text-xs text-gray-300">Backend Developer</p>
                        </div>
                        <div className="text-center mx-5 mb-5">
                            <div className="rounded-full overflow-hidden">
                                <img src={rodgiePhoto} alt="alexrodgieander" className="w-30 border-5 border-[#3b6493] rounded-full cursor-pointer transition-all duration-300 hover:scale-110" onClick={() => window.open('https://www.linkedin.com/in/rodgieaquino/', '_blank')} />
                            </div>
                            <p className="font-semibold pt-1">Rodgie Aquino</p>
                            <p className="text-xs text-gray-300">Frontend Developer</p>
                        </div>
                    </div>
                    <div className=" font-semibold text-center text-xs pt-15">
                        <p>PawPals | Developed by Uplift Devs.</p>
                        <p>© 2025 All rights reserved.</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AboutUs
