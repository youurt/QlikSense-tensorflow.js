export function loadMatrix(layout) {
    let _qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
    return _qMatrix;
}

export function measureLabels(layout) {
    let _measureLabels = layout.qHyperCube.qMeasureInfo;
    return _measureLabels;
}