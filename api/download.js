export default function handler(req, res) {

  // redirect ke file pdf static
  res.writeHead(302, {
    Location: "/brochure.pdf"
  });

  res.end();

}