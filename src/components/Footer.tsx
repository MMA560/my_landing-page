
import React from "react";
import { Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary/40 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-serif text-xl font-medium mb-4">LUXE</div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Premium handcrafted shoes designed for style, comfort, and durability.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Collections</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Sizing Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Care Instructions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                123 Fashion Street<br />
                New York, NY 10001
              </p>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@luxeshoes.com" className="hover:text-foreground transition-colors">
                  info@luxeshoes.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LUXE. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
