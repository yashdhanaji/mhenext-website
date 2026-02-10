import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import "./ExpandableCard.css";

export default function ExpandableCard({ cards }) {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="expandable-overlay"
          />
        )}
      </AnimatePresence>

      {/* Expanded Modal */}
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="expandable-modal-wrapper">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="expandable-close-btn"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="expandable-modal"
            >
              <div className="expandable-modal-scroll">
                <motion.div layoutId={`image-${active.title}-${id}`}>
                  <img
                    width={200}
                    height={200}
                    src={active.src}
                    alt={active.title}
                    className="expandable-modal-image"
                  />
                </motion.div>

                <div className="expandable-modal-header">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="expandable-modal-title"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="expandable-modal-desc"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="expandable-cta-btn active"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="expandable-modal-content">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="expandable-modal-body"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Card Grid - pill container with 2 square cards */}
      <div className="expandable-pill-wrapper">
        <div className="expandable-card-grid">
          {cards.map((card) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              className="expandable-card-item"
            >
              <motion.div
                layoutId={`image-${card.title}-${id}`}
                className="expandable-card-image-wrap"
              >
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="expandable-card-thumb"
                />
              </motion.div>
              <div className="expandable-card-body">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="expandable-card-title"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="expandable-card-desc"
                >
                  {card.description}
                </motion.p>
                <motion.button
                  layoutId={`button-${card.title}-${id}`}
                  className="expandable-cta-btn"
                >
                  {card.ctaText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="expandable-close-icon"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
