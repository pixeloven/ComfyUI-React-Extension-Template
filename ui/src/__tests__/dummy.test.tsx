import React from 'react';
import { render, screen } from '@testing-library/react';

// A simple component for testing
function DummyComponent({ text }: { text: string }) {
  return <div data-testid="dummy-component">{text}</div>;
}

describe('Dummy Component', () => {
  it('renders with provided text', () => {
    render(<DummyComponent text="Hello ComfyUI!" />);
    
    const element = screen.getByTestId('dummy-component');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello ComfyUI!');
  });
});