import React from 'react'

const CustomLoading = () => {
     React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [ ]);
  
  return (
   <div className="flex items-center justify-center min-h-screen">
      <div className="w-14 h-14 border-8 border-primary border-dotted rounded-full animate-spin"></div>
    </div>
  )
}

export default CustomLoading