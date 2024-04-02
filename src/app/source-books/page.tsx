import FileUpload from "@/components/FileUpload";
import NavMenu from "@/components/NavMenu";
import Chat from "@/components/chat";

const Sourcebooks = () => {

    return (
        <div>            
            <NavMenu/>
            <div className="flex justify-center items-center">
                <FileUpload/>                     
            </div>
            <Chat/>
        </div>
    );
}

export default Sourcebooks;