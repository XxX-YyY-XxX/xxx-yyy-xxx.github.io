function IsSubsetOf(subset, mainset){
    return subset.every(val => mainset.includes(val));
}