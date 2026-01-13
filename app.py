#!/usr/bin/env python3
"""
Web Games Collection Server
A simple HTTP server to serve the web-based games collection
"""

import http.server
import socketserver
import os
from urllib.parse import urlparse, parse_qs

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """
    Custom request handler to serve our games collection
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        # Add CORS headers to allow all origins
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

def main():
    port = 8000
    print(f"Starting Web Games Collection server...")
    print(f"Server running at http://localhost:{port}/")
    print("Press Ctrl+C to stop the server")
    
    try:
        with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
            print("\nWeb Games Collection is ready!")
            print("Open your browser and navigate to the URL above to play the games.")
            print("The games work on computers, tablets, and smartphones.")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\nShutting down the server...")
        print("Web Games Collection closed.")

if __name__ == "__main__":
    main()