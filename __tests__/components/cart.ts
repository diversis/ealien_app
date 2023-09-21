import { render, screen } from '@testing-library/react'
import cart from '@/components/cart/Cart'
import '@testing-library/jest-dom'


describe('Cart', () => {
    it('renders a heading', () => {
        render(<Home />)
   
      const heading = screen.getByRole('heading', {
            name: /welcome to next\.js!/i,
        })

        expect(heading).toBeInTheDocument()
    })
})
