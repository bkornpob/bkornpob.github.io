#!/usr/bin/env python3
import http.server, socketserver, pathlib, json
PORT = 8080
ROOT = pathlib.Path('.')

class S(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control','no-store')
        super().end_headers()
    def log_message(self, *a): pass

with socketserver.TCPServer(('',PORT), S) as h:
    print(f'DEMO LIVE http://localhost:{PORT}')
    h.serve_forever()
