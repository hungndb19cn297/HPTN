import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface IVote {
    isUpVote: boolean,
    isDownVote: boolean,
    point: number,
    clickUpVote: any,
    clickDownVote: any,
}

export default function Vote(vote: IVote) {

    return (
        <div style={{ border: '1px solid #000', borderRadius: 8, display: 'inline-block', textAlign: 'center' }}>
            <KeyboardArrowUpIcon style={{ width: 40, height: 40 }} onClick={vote.clickUpVote} className={!!vote.isUpVote ? 'green' : ''} />
            <div style={{ fontSize: 20, fontWeight: 600, display: 'inline-block' }}>{vote.point}</div>
            <KeyboardArrowDownIcon style={{ width: 40, height: 40 }} onClick={vote.clickDownVote} className={!!vote.isDownVote ? 'red' : ''} />
        </div>
    )
}

