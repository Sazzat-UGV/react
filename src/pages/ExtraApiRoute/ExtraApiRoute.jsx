{

    // post request
    const authInfo = {
        email: values?.email,
        password: values?.password
    }

    try {
        const res = await pppp(authInfo).unwrap()
        console.log(res)

    } catch (error) {
        console.log(error)
    }

}



{
    // update request
    try {
        const res = await uuu(authInfo).unwrap()
        console.log(res)

    } catch (error) {
        console.log(error)
    }

}