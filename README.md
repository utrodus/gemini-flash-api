# 🚀 Gemini Flash API

Welcome to **Gemini Flash API**! This project provides a simple Express.js server that lets you interact with Google's Gemini AI models for text, image, document, and audio generation/transcription. It's designed to be fast, flexible, and easy to use for your AI-powered applications. 🤖✨

---

## 📦 Features

- **Text Generation**: Generate text responses from prompts.
- **Image Understanding**: Send images with prompts for AI-powered analysis.
- **Document Summarization**: Upload documents and get summaries or answers.
- **Audio Transcription**: Upload audio files and receive transcripts.

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/utrodus/gemini-flash-api.git
cd gemini-flash-api
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your Gemini API key:

```
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3000 # Optional, defaults to 3000
```

> 🔑 **Note:** You need a valid API key from [Google AI Studio](https://aistudio.google.com/app/apikey) to use Gemini models.

### 4. Run the Server

```bash
npm start
```

The server will start at: [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 API Endpoints

All endpoints accept `application/json` for text, and `multipart/form-data` for files.

### 1. `/generate-text`  
**POST**  
Generate text from a prompt.

**Body:**
```json
{
  "prompt": "Tell me a joke!"
}
```

---

### 2. `/generate-from-image`  
**POST**  
Generate content from an image and prompt.

**Form Data:**
- `image`: (file) Image file (PNG, JPG, etc.)
- `prompt`: (string) Your prompt

---

### 3. `/generate-from-document`  
**POST**  
Generate content from a document and prompt.

**Form Data:**
- `document`: (file) Document file (PDF, DOCX, etc.)
- `prompt`: (string, optional) Your prompt

---

### 4. `/generate-from-audio`  
**POST**  
Transcribe or analyze audio files.

**Form Data:**
- `audio`: (file) Audio file (MP3, WAV, etc.)
- `prompt`: (string, optional) Your prompt

---

## 📋 Example Usage (with `curl`)

### Generate Text

```bash
curl -X POST http://localhost:3000/generate-text \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Summarize the latest AI trends."}'
```

### Generate from Image

```bash
curl -X POST http://localhost:3000/generate-from-image \
  -F "image=@/path/to/image.jpg" \
  -F "prompt=Describe this image."
```

### Generate from Document

```bash
curl -X POST http://localhost:3000/generate-from-document \
  -F "document=@/path/to/document.pdf" \
  -F "prompt=Summarize this document."
```

### Generate from Audio

```bash
curl -X POST http://localhost:3000/generate-from-audio \
  -F "audio=@/path/to/audio.mp3" \
  -F "prompt=Transcribe this audio."
```

---

## 📝 Notes

- The default Gemini model used is: `gemini-2.5-flash`
- All responses are returned as JSON.
- Error messages are returned with HTTP status `500` and a descriptive message.

---

## 🙋 FAQ

**Q: Can I use other Gemini models?**  
A: Yes! Change the `GEMINI_MODEL` variable in `index.js`.

**Q: What file types are supported?**  
A: Most common image, document, and audio formats are supported.

**Q: How do I get a Gemini API key?**  
A: Visit [Google AI Studio](https://aistudio.google.com/app/apikey) and follow the instructions.

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Feel free to open issues for bugs or feature requests.

---

## 📄 License

This project is licensed under the ISC License.

---

Happy hacking! 🎉  
