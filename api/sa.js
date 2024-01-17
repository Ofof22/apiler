const { getJson } = require("serpapi");

module.exports = (app) => {
  app.get("/api/search/:deger/:sayi", (req, res) => {
    const deger = req.params.deger;
    const sayi = parseInt(req.params.sayi, 10);

    // Sayı kontrolü yap
    if (isNaN(sayi) || sayi < 1 || sayi > 6) {
      return res.status(400).send("Hatalı sayı. Sayı 1 ile 6 arasında olmalıdır.");
    }

    const params = {
      engine: "google",
      q: deger,
      hl: "tr",
      gl: "tr",
      num: sayi.toString(), // Sayıyı API'ye uygun formata çevir
      start: "2",
      safe: "active",
      api_key: "447232a622005026466fb3ab92e1061c279c40399a6d69e73e0c3cef3b678813",
    };

    getJson(params, (json) => {
      // Belirli alanları çıkart
      const sanitizedResults = json.organic_results.map((result) => {
        const { favicon, about_page_serpapi_link, thumbnail, ...rest } = result;
        return rest;
      });

      // JSON.stringify'nin üçüncü parametresi ile düzenli JSON oluştur
      const formattedData = JSON.stringify(sanitizedResults, null, 2);
      res.header("Content-Type", "application/json").send(formattedData);
    });
  });
};
