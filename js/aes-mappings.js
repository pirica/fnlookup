function downloadAes() {
    fetch('https://fortnitecentral.genxgames.gg/api/v1/aes').then(r => r.json()).then(r => {
        console.log(r);

        document.getElementById('fn-version').innerHTML = 'Fortnite v' + r.version + ' AES'
        document.getElementById('key-count').innerHTML = r.dynamicKeys.length + ' dynamic - ' + r.unloaded.length + ' unloaded';

        let table = document.getElementById('aes-table');
        let unloadedTable = document.getElementById('unloaded-table');

        for (let key of r.dynamicKeys) {
            if (r.dynamicKeys.indexOf(key) != 0) {
                table.innerHTML += '<hr>';
            }

            table.innerHTML += '<h2><code>' + key.name + '</code></h2>';
            table.innerHTML += '<p>Key: <code>' + key.key + '</code></p>';
            table.innerHTML += '<p>GUID: <code>' + key.guid + '</code></p>';
            table.innerHTML += '<p>Keychain: <code>' + key.keychain + '</code></p>';
            table.innerHTML += '<p>Files: ' + key.fileCount + '</p>';
            table.innerHTML += '<p>High Resolution Textures: ' + (key.hasHighResTextures ? 'Yes' : 'No') + '</p>';
            table.innerHTML += '<p>Size: ' + key.size.formatted + ' (<code>' + key.size.raw + '</code> B)</p>';
        }

        for (let key of r.unloaded) {
            if (r.unloaded.indexOf(key) != 0) {
                unloadedTable.innerHTML += '<hr>';
            }

            unloadedTable.innerHTML += '<h2><code>' + key.name + '</code></h2>';
            if (key.key) unloadedTable.innerHTML += '<p>Key: <code>' + key.key + '</code></p>';
            unloadedTable.innerHTML += '<p>GUID: <code>' + key.guid + '</code></p>';
            unloadedTable.innerHTML += '<p>Files: ' + key.fileCount + '</p>';
            unloadedTable.innerHTML += '<p>High Resolution Textures: ' + (key.hasHighResTextures ? 'Yes' : 'No') + '</p>';
            unloadedTable.innerHTML += '<p>Size: ' + key.size.formatted + ' (<code>' + key.size.raw + '</code> B)</p>';
        }
    })
}

function downloadMappings() {
    fetch('https://fortnitecentral.genxgames.gg/api/v1/mappings').then(r => r.json()).then(r => {
        console.log(r);

        let table = document.getElementById('mappings-table');

        for (let map of r) {
            if (r.indexOf(map) != 0) {
                table.innerHTML += '<hr>';
            }

            table.innerHTML += '<h2><code>' + map.fileName + '</code></h2>';
            table.innerHTML += '<p><a href="' + map.url + '">Download</a></p>';
            table.innerHTML += '<p>Hash: <code>' + map.hash + '</code></p>';
            table.innerHTML += '<p>Length: <code>' + map['length'] + '</code></p>';

            let uploadDate = new Date(map.uploaded);

            table.innerHTML += '<p>Uploaded: ' + getFormatDate(uploadDate) + ' ' + cero(uploadDate.getUTCHours()) + ':' + cero(uploadDate.getUTCMinutes()) + ':' + cero(uploadDate.getUTCSeconds()) + '</p>';
            table.innerHTML += '<p>Version: <code>' + map.meta.version + '</code></p>';
            table.innerHTML += '<p>Compression Method: ' + map.meta.compressionMethod + '</p>';
            table.innerHTML += '<p>Platform: ' + map.meta.platform + '</p>';
        }
    })
}