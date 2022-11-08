export function FormatSize(fileSize) { // 文件大小 格式‘化
	let arrUnit = ["B", "K", "M", "G", "T", "P"]
	// if (fileSize) {
	let baseStep = 1024,
		unitCount = arrUnit.length,
		unitIndex = 0;
	while (Math.abs(fileSize)  >= baseStep && unitIndex < unitCount - 1) {
		unitIndex++;
		fileSize /= baseStep;
	} 
	fileSize = fileSize.toFixed(2);
	return fileSize + " " + arrUnit[unitIndex];
	// }


}

export default {
	FormatSize
}
