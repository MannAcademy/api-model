const tf = require('@tensorflow/tfjs-node');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

const loadModel = async (req, res) => {
  try {
    const bucketName = req.params.bucketName;
    const fileName = req.params.fileName;

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    const tempFilePath = `/tmp/${fileName}`;
    await file.download({ destination: tempFilePath });

    const model = await tf.loadLayersModel(`file://${tempFilePath}`);

    // Ekstrak informasi dari model (CONTOH) - sesuaikan dengan model Anda
    const json_string = JSON.stringify(model.toJSON());
    const layerConfigs = JSON.parse(json_string).config.layers;

    const data = layerConfigs.map(layer => ({
      nama: layer.config.name,
      kalori: layer.config.units || 0, // Ganti dengan nilai kalori dari layer
      lemak: layer.config.filters || 0, // Ganti dengan nilai lemak dari layer
      karbohidrat: layer.config.rate || 0 // Ganti dengan nilai karbohidrat dari layer
    }));

    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Gagal memproses model' });
  }
};

module.exports = { loadModel };