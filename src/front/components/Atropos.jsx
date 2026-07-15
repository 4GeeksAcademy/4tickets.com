import React from "react";
import Atropos from "atropos/react";
import "atropos/css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay} from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import concertImage from "../assets/img/concert.jpg";
import festivalImage from "../assets/img/festival.jpg";
import theaterImage from "../assets/img/theater.jpg";

import { FollowButton } from "./FollowButton.jsx";

export const AtroposCard = () => {
    const navigate = useNavigate();

    return (
    <div className="container my-5">
        <h2 className="text-center mb-4">Featured Events</h2>

        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            grabCursor
            loop
            autoplay={{
                delay: 3500,
                disableOnInteraction: false
            }}
            style={{ paddingBottom: "50px" }}
        >
            {/* TARJETA 1 */}
            <SwiperSlide>
                <Atropos
                    className="featured-atropos"
                    shadow={false}
                    highlight={false}
                >
                    <div className="featured-card">
                        <img
                            src={festivalImage}
                            alt="Summer Concert"
                            className="featured-card-img"
                            data-atropos-offset="-3"
                        />

                        <div className="featured-card-overlay">
                            <span
                                className="featured-card-category"
                                data-atropos-offset="3"
                            >
                                Concert
                            </span>

                            <div data-atropos-offset="5">
                                <h3>Summer Concert</h3>
                                <p>Madrid · June 25, 2026</p>

                                <div className="d-flex gap-2 justify-content-center">
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => navigate("/single/1")}
                                    >
                                        Buy Ticket
                                    </button>

                                    <FollowButton eventId={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Atropos>
            </SwiperSlide>

            {/* TARJETA 2 */}
            <SwiperSlide>
                <Atropos
                    className="featured-atropos"
                    shadow={false}
                    highlight={false}
                >
                    <div className="featured-card">
                        <img
                            src={concertImage}
                            alt="Music Festival"
                            className="featured-card-img"
                            data-atropos-offset="-3"
                        />

                        <div className="featured-card-overlay">
                            <span
                                className="featured-card-category"
                                data-atropos-offset="3"
                            >
                                Festival
                            </span>

                            <div data-atropos-offset="5">
                                <h3>Music Festival</h3>
                                <p>Barcelona · July 10, 2026</p>

                                <div className="d-flex gap-2 justify-content-center">
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => navigate("/single/2")}
                                    >
                                        Buy Ticket
                                    </button>

                                    <FollowButton eventId={2} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Atropos>
            </SwiperSlide>

            {/* TARJETA 3 */}
            <SwiperSlide>
                <Atropos
                    className="featured-atropos"
                    shadow={false}
                    highlight={false}
                >
                    <div className="featured-card">
                        <img
                            src={theaterImage}
                            alt="Theater Night"
                            className="featured-card-img"
                            data-atropos-offset="-3"
                        />

                        <div className="featured-card-overlay">
                            <span
                                className="featured-card-category"
                                data-atropos-offset="3"
                            >
                                Theater
                            </span>

                            <div data-atropos-offset="5">
                                <h3>Theater Night</h3>
                                <p>Valencia · August 5, 2026</p>

                                <div className="d-flex gap-2 justify-content-center">
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => navigate("/single/3")}
                                    >
                                        Buy Ticket
                                    </button>

                                    <FollowButton eventId={3} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Atropos>
            </SwiperSlide>
        </Swiper>
    </div>
);
};