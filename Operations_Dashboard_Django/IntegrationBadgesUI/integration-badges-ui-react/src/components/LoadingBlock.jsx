export default function LoadingBlock(props = {processing: true}) {
    if (props.processing) {
        return <div className={`w-100 ${props.className}`}>
            <div className="text-center">
                <span className="pe-3">Loading...</span>
                <span className="spinner-border spinner-border-sm ms-auto" role="status" aria-hidden="true"></span>
            </div>
        </div>
    } else {
        return props.children
    }
}


