import { useEffect, useState } from "react";
import CommonTitle from "../../components/shared/CommonTitle";
import CustomContainer from "../../components/shared/CustomContainer";
import { useGetPhotoGallaryApiQuery } from "../../redux/web/photoGallary/webPhotoGallaryApi";
import CustomLoading from "../../components/shared/CustomLoading";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";



const PhotoGallery = () => {
   const location = useLocation();
  const [showAll, setShowAll] = useState(false);

  const { data: gallaryPhoto, isLoading } = useGetPhotoGallaryApiQuery();
  const gallaryPhotData = gallaryPhoto?.data?.data || [];



  const firstSeven = gallaryPhotData.slice(0, 7);
  const restPhotos = gallaryPhotData.slice(7);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    useEffect(() => {
    document.title = "FULL CIRCLE Detailing~Photo Gallery";
  }, [location.pathname]);

  if (isLoading) {
    return <CustomLoading />
  }

  return (
    <>
      <Helmet>
        <title>FULL CIRCLE Detailing~Photo Gallery</title>
      </Helmet>
      <section className="bg-[#f6f6f6] pb-6 pt-28 lg:pt-32">
        {
          gallaryPhotData?.length > 0 ? <CustomContainer>
            <div className="pb-[22px]">
              <CommonTitle text={"Photo gallery"} />
            </div>

            {/* === Small Devices: One below another === */}
            <div className="flex flex-col gap-4 md:hidden">
              {firstSeven.map((item, index) => (
                <img
                  key={item.id}
                  src={item.photo}
                  alt={`Gallery Mobile ${index + 1}`}
                  className="w-full h-[300px] rounded-lg object-cover"
                />
              ))}

              {/* If showAll is true, show rest photos below on mobile */}
              {showAll && restPhotos.length > 0 && (
                restPhotos.map((item, index) => {
                  return (
                    <img
                      key={item.id}
                      src={item.photo}
                      alt={`Gallery Mobile Extra ${index + 1}`}
                      className="w-full h-[300px] rounded-lg object-cover"
                    />
                  )
                })
              )}
            </div>

            {/* === Medium & Large Devices: Custom Grid for first 7 === */}
            <div className="hidden md:grid grid-cols-12 grid-rows-12 gap-4 h-auto md:h-[400px] lg:h-[600px]">
              {firstSeven.map((item, index) => {
                const gridStyles = [
                  "col-start-1 col-end-6 row-start-1 row-end-7",
                  "col-start-6 col-end-10 row-start-1 row-end-5",
                  "col-start-10 col-end-13 row-start-1 row-end-7",
                  "col-start-6 col-end-10 row-start-5 row-end-9",
                  "col-start-10 col-end-13 row-start-7 row-end-13",
                  "col-start-6 col-end-10 row-start-9 row-end-13",
                  "col-start-1 col-end-6 row-start-7 row-end-13",
                ];

                return (
                  <div
                    key={item.id}
                    className={`bg-gray-300 rounded-xl ${gridStyles[index]}`}
                  >
                    <img
                      src={item.photo}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                );
              })}
            </div>

            {/* === Load More Section (standard grid) === */}
            {showAll && restPhotos.length > 0 && (
              <div className="hidden md:grid grid-cols-12 grid-rows-12 gap-4 h-auto md:h-[300px] mt-4">
                {restPhotos.map((item, index) => {
                  const gridStyles = [
                    "col-start-1 col-end-4 row-start-1 row-end-4",
                    "col-start-4 col-end-7 row-start-1 row-end-5",
                    "col-start-7 col-end-13 row-start-1 row-end-5",
                    // "col-start-6 col-end-10 row-start-5 row-end-9",
                    // "col-start-10 col-end-13 row-start-7 row-end-13",
                    // "col-start-6 col-end-10 row-start-9 row-end-13",
                    // "col-start-1 col-end-6 row-start-7 row-end-13",
                  ];
                  return (
                    <div key={index} className={`bg-gray-300 rounded-xl ${gridStyles[index]}`}>
                      <img
                        src={item.photo}
                        alt="Gallery Extra"
                        className="w-full h-[250px] object-cover rounded-lg"
                      />
                    </div>
                  )
                })}
              </div>
            )}

            {/* === Load More Button === */}
            {gallaryPhotData.length > 7 && !showAll && (
              <div className="flex justify-center items-center py-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="border border-[#ccc] px-6 py-2 rounded-full text-[16px] font-semibold font-degular"
                >
                  Load more
                </button>
              </div>
            )}
          </CustomContainer>
            :
            <div className="min-h-[200px] md:min-h-[300px] lg:min-h-[600px] rounded-lg flex justify-center items-center">
              <p className="lg:text-6xl md:text-1xl text-base font-bold text-gray-200 uppercase text-center">No data found</p>
            </div>
        }
      </section>
    </>
  );
};

export default PhotoGallery;
