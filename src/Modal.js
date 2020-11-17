export default function Modal ({onClose, render}) {
    function handleClose(){
        onClose(false)
    }
    const args = {
        onClose: handleClose
    }

    return render(args)

}
