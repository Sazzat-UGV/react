

const AuthWrapper = ({children,className,}) => {
  return (
    <div className=" h-screen mx-auto flex flex-col justify-center items-center">
    <div className={` bg-[#ffffff] min-w-[800px] px-40 flex flex-col justify-center items-center py-28  shadow-lg  border rounded-xl ${className}`}>{children}
    </div>
    </div>
  )
}

export default AuthWrapper