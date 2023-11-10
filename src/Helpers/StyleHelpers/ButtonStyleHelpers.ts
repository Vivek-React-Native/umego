export const variantHelper = (variant: string="outlined", backgroundColor?: string) => {
    let variantStyle = variant === "outlined" ? {
        borderWidth: 1,
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: backgroundColor
    }: {
        borderWidth: 1,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor
    }
    return variantStyle
}

export const sizeHelper = (size: string="", height?: string) => {
    let sizeStyle = size === "xlarge" ? {
        width: "95%",
        height: "auto"
    } : size === "medium" ? {
        width: "45%",
        height
    } : size === "large" ? {
        width: "70%",
        height
    } : size === "small" ? {
        width: "20%",
        height
    } : {
        width: "auto",
        height
    }  
    return sizeStyle
}
export const cornerHelper = (corner: string="cornered") => {
    let cornerStyle = corner === "rounded" ? {
        borderRadius: 50,
    } : corner === "curved" ? {
        borderRadius: 10,
    } : {
        borderRadius: 0,
    }
    return cornerStyle
}

export const textColorHelper = (variant?: string, color?: string, textColor?: string) => {
    let txtColor = "black"
    if(variant === "outlined" ||variant === undefined){
        txtColor = textColor ? textColor : color ? color : txtColor
    }else{
        txtColor = textColor ? textColor : "white"
    }
    return txtColor
}