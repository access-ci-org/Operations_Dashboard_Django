export default function LoadingBlock(props = {processing: true}) {
    if (props.processing) {
        return <div className={`w-100 ${props.className}`}>
            <div className="d-flex align-items-center">
                <strong>Loading...</strong>
                <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </div>
        </div>
    } else {
        return props.children
    }
}


