import MenuWrapper from "@/components/MenuWrapper";
import RecordingList from "@/components/RecordingList";
import NavMenu from "@/components/NavMenu";


const GameRecordings = () => {

    const files = [
        { type: 'audio', id:'hb1h23b', name: 'session1.mp3', dateUploaded: '2023-03-23', isIndexed: true },
        { type: 'pdf', id:'j1b2jk', name: 'session2.mp3', dateUploaded: '2023-03-22', isIndexed: false },
        // Add more files here
    ];

    return (
        <div>
            <NavMenu/>
            <div className='w-3/4'>
                <RecordingList files={files}/>
            </div>
        <div/>
    );
}

export default GameRecordings;