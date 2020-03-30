function xml2json(srcDOM) {
    let children = [...srcDOM.children];
    if (!children.length) {
        if (srcDOM.attributes && srcDOM.attributes.length > 0) {
            let attributeData = {};
            attributeData.attributes = {};
            for (let i = 0; i < srcDOM.attributes.length; i++) {
                attributeData.attributes[srcDOM.attributes[i].name] = srcDOM.attributes[i].value;
            }
            attributeData.text = srcDOM.innerHTML;
            return attributeData;
        } else {
            return srcDOM.innerHTML;
        }
    }
    let jsonResult = {};
    for (let child of children) {
        // checking is child has siblings of same name. 
        let childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;
        // if child is array, save the values as array, else as strings. 
        if (childIsArray) {
            if (jsonResult[child.nodeName] === undefined) {
                jsonResult[child.nodeName] = [xml2json(child)];
            } else {
                jsonResult[child.nodeName].push(xml2json(child));
            }
        } else {
            jsonResult[child.nodeName] = xml2json(child);
        }
    }
    // Attributes
    if (srcDOM.attributes && srcDOM.attributes.length > 0) {
        jsonResult.attributes = {};
        for (let i = 0; i < srcDOM.attributes.length; i++) {
            jsonResult.attributes[srcDOM.attributes[i].name] = srcDOM.attributes[i].value;
        }
    }
    return jsonResult;
}