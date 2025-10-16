import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollRestoration = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const scrollPositions = JSON.parse(
      sessionStorage.getItem("scrollPositions") || "{}"
    );

    if (navigationType === "POP") {
      const savedPosition = scrollPositions[pathname];
      if (savedPosition) {
        window.scrollTo(0, savedPosition);
      }
    } else {
      window.scrollTo(0, 0);
    }

    const saveScrollPosition = () => {
      const newScrollPositions = {
        ...scrollPositions,
        [pathname]: window.scrollY,
      };
      sessionStorage.setItem(
        "scrollPositions",
        JSON.stringify(newScrollPositions)
      );
    };

    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      saveScrollPosition();
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, [pathname, navigationType]);

  return null;
};

export default ScrollRestoration;