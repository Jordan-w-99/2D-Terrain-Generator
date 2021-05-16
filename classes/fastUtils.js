function fastMap(val, valMin, valMax, resMin, resMax) {
    let valRange = valMax - valMin;
    let valPercent = val / valRange;

    let resRange = resMax - resMin;
    let res = resMin + resRange * valPercent;

    if(res < resMin) res = resMin;
    else if(res > resMax) res = resMax;

    return res;
}