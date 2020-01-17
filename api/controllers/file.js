const xlstojson = require('xls-to-json-lc')
const xlsxtojson = require('xlsx-to-json-lc')

module.exports = {
    // Subir atchivos
    upload: async (res, req) => {
        if (!req.files.file) {
            res.send("No hay archivos que subir");
            return;
        }
        var sampleFile = req.files.file;
        var exceltojson;

        sampleFile.mv('./uploads/' + req.files.file.name, function (err) {
            if (err) {
                console.log("error saving")
            } else {
                console.log("saved")
                if (req.files.file.name.split('.')[req.files.file.name.split('.').length - 1] === 'xlsx') {
                    exceltojson = xlsxtojson;
                    console.log('xlxs')
                } else {
                    exceltojson = xlstojson;
                    console.log('xls')
                }
                try {
                    exceltojson({
                        input: './uploads/' + req.files.file.name,
                        output: null,
                        lowerCaseHeaders: true
                    }, function (err, result) {
                        if (err) {
                            return res.json({
                                error_code: 1,
                                err_desc: err,
                                data: null
                            });
                        }
                        res.json({
                            error_code: 0,
                            err_desc: null,
                            data: result
                        });
                        var fs = require('fs');
                        try {
                            fs.unlinkSync('. / uploads /' + req.files.file.name);
                        } catch (e) {
                            //error deleting the file
                        }
                    });
                }catch(e){
                    console.log("error")
                    res.json({error_code:1,err_desc:"Corupted excel file"});
                }
            }
        });
    }
}