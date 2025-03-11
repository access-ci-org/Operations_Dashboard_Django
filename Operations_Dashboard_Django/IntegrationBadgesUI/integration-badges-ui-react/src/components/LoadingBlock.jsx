export default function LoadingBlock(props = {processing: true}) {
    if (props.processing) {
        return <div className={`w-100 ${props.className}`}>
            <div className="text-center">
                <strong className="pe-3">Loading...</strong>
                <span className="spinner-border spinner-border-sm ms-auto" role="status" aria-hidden="true"></span>
            </div>
        </div>
    } else {
        return props.children
    }
}


